'use client';

export const retrieveStoreToWrite = (storageName: string) => {

    return new Promise<IDBObjectStore>((resolve,rejects) => {
        const db_open: IDBOpenDBRequest = indexedDB.open(storageName);
    
        db_open.onsuccess = () => {
            const db_instance: IDBDatabase = db_open.result;
    
            const db_transaction: IDBTransaction = db_instance.transaction(
                storageName, 'readwrite'
            );
            const db_store: IDBObjectStore = db_transaction.objectStore(
                storageName
            );

            resolve(db_store);
        };
    
        db_open.onerror = () => {
            console.error("Ocorreu um erro ao abrir o banco de dados");
            rejects(console.error("Rejeitado abertura"));
        };
    })
}