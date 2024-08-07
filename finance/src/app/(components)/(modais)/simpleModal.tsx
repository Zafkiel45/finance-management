'use client';
// hooks
import { useState,useContext } from "react";
// types
import { Dispatch, SetStateAction } from "react";
// svgs
import CloseSVG from "../../../../public/svg/close";
// util function
import { HandleCloseModal } from "@/app/(utils)/closeModal";
import { retrieveStoreToWrite } from "@/app/(utils)/retriveStoreDB";
// context 
import { TRIGGER_CONTEXT } from "@/app/(context)/trigger";


interface TypeArg {
  content: string;
  state: boolean;
  handleFunction: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
  inputType: string;
  handleType?: string;
}

export const SimpleModal = ({
  content,
  state,
  handleFunction,
  placeholder,
  inputType,
  handleType = '',
}: TypeArg) => {
  let checkStateOfModal: string = state ? "flex" : "hidden";

  const [inputValue, setInputValue] = useState<string>('');
  // trigger context
  const triggerObject = useContext(TRIGGER_CONTEXT);

  if(!triggerObject) {
    throw new Error("PROBLEMAS COM O TRIGGER_OBJECTO no Modal");
  }

  async function HandleDetermineCall() {
      if(inputType === 'number') {
        await HandleUpdateSaldo();
      } else {
        await HandleUpdateCategorie();
      }
  }

  async function HandleUpdateSaldo() {
    try { 
      const DB_OPEN: IDBOpenDBRequest = indexedDB.open('finances');

      DB_OPEN.onsuccess = (e) => {
        const DB_INSTANCE: IDBDatabase = (e.target as IDBRequest).result;
        const TRANSACTION: IDBTransaction = DB_INSTANCE.transaction('finances', 'readwrite');
        const DB_STORE: IDBObjectStore = TRANSACTION.objectStore('finances');
        const RETRIEVED_VALUE: IDBRequest = DB_STORE.get(1);

        RETRIEVED_VALUE.onsuccess = () => {

          let OLD_VALUES = RETRIEVED_VALUE.result;

          if(handleType === 'saldo') {
            OLD_VALUES = {...OLD_VALUES, saldo: Number(inputValue)};
          } else {
            OLD_VALUES = {...OLD_VALUES, gastos_mes: Number(inputValue)};            
          }

          const NEW_VALUE = DB_STORE.put(OLD_VALUES);

          NEW_VALUE.onsuccess = () => {
            setInputValue(() => '');
            triggerObject?.setTrigger((e) => !e);
            HandleCloseModal(handleFunction);
          };

          NEW_VALUE.onerror = () => {
            window.alert("OCORREU UM ERRO AO ATUALIZAR OS VALORES");
          };

        }
      }

    } catch (err) {
      console.error('ocorreu um erro:', err);
    };
  }

  async function HandleUpdateCategorie() {
    const db_promise_store: Promise<IDBObjectStore> = retrieveStoreToWrite(
      'finances'
    );
    const values = await db_promise_store; // Type: IDBObjectStore;
    const array_categories: IDBRequest<any> = values.get(2);

    array_categories.onsuccess = () => {
      // array com 1 propriedade categories
      const result_categories = array_categories.result;

      result_categories.categories.push({
        nome: inputValue,
        gastos: 0,
      });

      values.put(result_categories);
      // apaga os valores do input e fecha o modal 
      setInputValue('');
      HandleCloseModal(handleFunction);
      triggerObject?.setTrigger((e) => !e);
    };
  }

  return (
    <div
      className={`${checkStateOfModal} z-20 w-screen h-screen flex transition-opacity backdrop-blur-sm  items-center justify-center top-0 left-0 fixed`}
    >
      {/* overlay acima*/}
      {/* Modal abaixo*/}
      <div
        className={`bg-white dark:bg-[#111111] border border-[#414141] shadow-sm rounded-lg gap-5 flex flex-col justify-center w-fit h-fit py-3 mobileMedium:w-5/6 destkopMini:w-2/4 desktopMedium:px-6 desktopMedium:py-5 tabletMini:w-4/6 px-5`}
      >
        {/* label e close button container */}
        <div className="w-full h-fit flex justify-between items-center">
          <div className="mobileMedium:text-lg desktopMedium:text-2xl destkopMini:text-xl">{content}</div>
          <div>
            <CloseSVG className={`destkopMini:w-4 desktopMedium:h-6  desktopMedium:w-6 destkopMini:h-4`} onClick={() => HandleCloseModal(handleFunction)} />
          </div>
        </div>
        {/* input container */}
        <div className="w-full h-fit">
          <input
            type={inputType}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="shadow-md mobileMedium:w-full bg-white dark:bg-[#111111] rounded-lg mobileMedium:px-3 desktopMedium:p-4 mobileMedium:py-2 px-2 py-1 border border-gray-500 placeholder:text-gray-400 desktopMedium:placeholder:text-xl desktopMedium:text-xl placeholder:text-sm"
          />
        </div>
        {/* button container */}
        <div className="self-end">
          <button onClick={HandleDetermineCall} className="bg-[#003362] text-[#eee] py-1 px-2 desktopMedium:text-lg mobileMedium:px-3 mobileMedium:py-2 rounded-md text-sm border-2 border-[#205D9E]">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
