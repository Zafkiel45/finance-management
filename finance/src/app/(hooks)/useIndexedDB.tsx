'use client'

import { useEffect } from "react"

export const UseIndexedDB = ({
    objectStoreName,
    version,
}: {objectStoreName: string, version: number}) => {

    useEffect(() => {
        const openIDB: IDBOpenDBRequest = 
            window.indexedDB.open(objectStoreName, version);

        openIDB.onupgradeneeded = (event) => {
            const databaseInstance: IDBDatabase = (event.target as IDBRequest).result;

            const ObjectStore: IDBObjectStore = 
                databaseInstance.createObjectStore(
                    'finances', {autoIncrement: true, keyPath: 'id'}
                );

            ObjectStore.transaction.oncomplete = (event) => {
                const updateStore = 
                databaseInstance
                .transaction('finances', 'readwrite')
                .objectStore('finances');

                updateStore.add({
                    saldo: 0,
                    gastos_mes: 0,
                });
            }
        };
    },[])
}