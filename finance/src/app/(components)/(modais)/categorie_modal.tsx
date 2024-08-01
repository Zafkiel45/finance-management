"use client";

import { CATEGORIE_CONTEXT } from "@/app/(context)/categorie_context";
import { useContext } from "react";
import { useRetrieveDB } from "@/app/(hooks)/useRetrieveData";
import CloseSVG from "../../../../public/svg/close";
import { HandleCloseModal } from "@/app/(utils)/closeModal";

export const CategorieModal = () => {
  const db_values = useRetrieveDB({ storeName: "finances", id: 2 });

  const categorie_context = useContext(CATEGORIE_CONTEXT);

  if (!categorie_context) {
    throw new Error("Ocorreu um erro ao abrir o categorie context");
  }

  if (!db_values) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Carregando categorias...
      </div>
    );
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-white dark:bg-[#111111] ${
        categorie_context.activeCategorieModal ? "flex" : "hidden"
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
                HandleCloseModal(categorie_context.setActiveCategorieModal)
              }
            />
          </div>
        </div>
        <div className="overflow-auto">
          <div className="flex flex-col gap-3 justify-center ">
            {db_values ? (
              <>
                {db_values.categories.map((item: any, index: number) => {
                  return (
                    <div className="bg-gray-200 dark:bg-[#1a1a1a] rounded-md p-3" key={index * 2}>
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
    </div>
  );
};
