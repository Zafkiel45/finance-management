"use client";

import { useEffect, useState, useContext } from "react";
import { TRIGGER_CONTEXT } from "../(context)/trigger";
import { UseIndexedDB } from "./useIndexedDB";

type DBOpen = IDBOpenDBRequest;
type DBRequest = IDBRequest;
type DBDatabase = IDBDatabase;
type DBStore = IDBObjectStore;
type DBTransaction = IDBTransaction;

interface argsTypes {
  storeName: string;
  id: number;
}

export function useRetrieveDB({ storeName, id }: argsTypes) {

  UseIndexedDB({objectStoreName: 'finances', version: 1})
  const [retrievedValues, setRetrievedValues] = useState<any>(null);
  // trigger context 
  const triggerObject = useContext(TRIGGER_CONTEXT);

  if(!triggerObject) {
    throw new Error("Probemas com o Trigger");
  }

  useEffect(() => {
    const handleRetriveValues = async () => {
      return new Promise((resolve, reject) => {
        const openDB: DBOpen = indexedDB.open(storeName);

        openDB.onsuccess = (event) => {
          console.log("Banco de dados aberto");
          const database: DBDatabase = (event.target as DBRequest).result;
          const transaction: DBTransaction = database.transaction(storeName);
          const store: DBStore = transaction.objectStore(storeName);
          const valueRetrieved: DBRequest = store.get(id);

          valueRetrieved.onsuccess = (event: any) => {
            resolve((event.target as DBRequest).result);
          };

          valueRetrieved.onerror = (err: any) => {
            reject('ocorreu um erro' + err);
          };
        };
        openDB.onerror = () => {
            throw new Error("Ocorreu um erro ao abrir o banco de dados");
        };
      });
    };

    const HandleSetValues = async () => {
        try {
            const DB_PROMISE = await handleRetriveValues();
            setRetrievedValues(DB_PROMISE);
        } catch (err) {
            console.log("ERROR AO OBTER A PROMISE");
        }
    };

    HandleSetValues();
    }, [triggerObject.trigger]);

    return retrievedValues;
}
