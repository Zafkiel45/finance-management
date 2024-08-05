"use client";

import { CATEGORIE_CONTEXT } from "@/app/(context)/categorie_context";
import { useContext, useState, useEffect} from "react";
import { useRetrieveDB } from "@/app/(hooks)/useRetrieveData";
import CloseSVG from "../../../../public/svg/close";
import { CategorieItemModal } from "./categorie_modal_item";
import { HandleCloseModal } from "@/app/(utils)/closeModal";
import { TRIGGER_CONTEXT } from "@/app/(context)/trigger";
import { retrieveStoreToWrite } from "@/app/(utils)/retriveStoreDB";


export const CategorieModal = () => {
  
  const [categories, setCategories] = useState<any>();
  const TRIGGER = useContext(TRIGGER_CONTEXT);
  const CATEGORIE_MODAL_CONTEXT = useContext(CATEGORIE_CONTEXT);

  if(!CATEGORIE_MODAL_CONTEXT) {
      throw new Error("OCORREU UM ERRO CO CATEOGORIE MODAL CONTEXT");
  }
  
  async function HandleSetCategories() {
      try {
          const db_promise = await retrieveStoreToWrite('finances');
          const db_item: IDBRequest = db_promise.get(2);
          
          db_item.onsuccess = () => {
              const db_result = db_item.result;
              setCategories(db_result.categories);
          }

      } catch (err) {
          console.error(`ocorreu um erro: ${err}`);
      }
  };

  useEffect(() => {
      const callCategorie = async () => {
          await HandleSetCategories();
      };

      callCategorie();
  }, [TRIGGER?.trigger])

  
  const [itemModal, setItemModal] = useState<any>([{
    name: '',
    index: 0,
  }]);

  function HandleOpenItemModal(item: any) {

      setItemModal((element:any) =>  [{...element, index: item.index, name: item.name}])
      CATEGORIE_MODAL_CONTEXT?.setActiveCategorieModalItem2(true);
      TRIGGER?.setTrigger(e => !e);

  };

  console.log(itemModal[0].index)

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-white dark:bg-[#111111] ${
        CATEGORIE_MODAL_CONTEXT.activeCategorieModal ? "flex" : "hidden"
      } justify-center items-center`}
    >
      {/* {acima overlay} */}
      {/* {abaixo modal } */}
      <div className="w-full h-full flex flex-col gap-4 p-3">
        <div className="flex justify-between items-center">
          <div>Todas as categorias</div>
          <div>
            <CloseSVG
              onClick={() =>
                HandleCloseModal(CATEGORIE_MODAL_CONTEXT.setActiveCategorieModal)
              }
            />
          </div>
        </div>
        <div className="overflow-auto">
          <div className="flex flex-col gap-3 justify-center ">
            {categories ? (
              <>
                {categories.map((item: any, index: number) => {
                  return (
                    <div onClick={() => HandleOpenItemModal({index: index, name: item.nome})} className="w-full text-[#212121] border-2 cursor-pointer dark:border-gray-600 border-gray-400 dark:text-[#eeee] h-fit p-3 rounded-lg bg-gray-200 dark:bg-[#1a1a1a]" key={index * 2}>
                      {item.nome}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                Parece que você não tem categorias... Tente criar algumas na
                página inicial, em "Categorias".
              </>
            )}
          </div>
        </div>
      </div>
        <CategorieItemModal handleClose={CATEGORIE_MODAL_CONTEXT.setActiveCategorieModalItem2} visible={CATEGORIE_MODAL_CONTEXT.activeCategorieModalItem2} key={`${itemModal[0].index}-${itemModal[0].name}`} categorieName={itemModal[0].name} index={itemModal[0].index} />
    </div>
  );
};
