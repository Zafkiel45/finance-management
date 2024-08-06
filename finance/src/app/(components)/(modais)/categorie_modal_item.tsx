"use client";

// contexts
import { CATEGORIE_CONTEXT } from "@/app/(context)/categorie_context";
import { TRIGGER_CONTEXT } from "@/app/(context)/trigger";
// hooks
import { useContext, useState, useEffect } from "react";
// svgs
import CloseSVG from "../../../../public/svg/close";
// utils
import { HandleCloseModal } from "@/app/(utils)/closeModal";
import { retrieveStoreToWrite } from "@/app/(utils)/retriveStoreDB";
// interfaces
interface propsTypes {
  index: number;
  categorieName: string;
  visible: boolean;
  handleClose: any;
}

export const CategorieItemModal = ({ index, categorieName, visible, handleClose }: propsTypes) => {
  // contexto de gerencimento de estado do modal entre: HIDDEN || FLEX
  const CATEGORIE_CONTEXT_ITEM = useContext(CATEGORIE_CONTEXT);

  if (!CATEGORIE_CONTEXT_ITEM) {
    throw new Error("Ocorreu um erro ao acessar: CATEGORIE_CONTEXT_ITEM");
  }
  // Recuperação de valores no banco de dados:
  const [expensesDB, setExpensesDB] = useState<number>();
  const [expenses, setExpenses] = useState<string>("");

  async function HandleAddExpensesToDatabase() {
    try {
      const db_promise = await retrieveStoreToWrite("finances");
      const db_store_values = db_promise.get(2);

      db_store_values.onsuccess = () => {
        const db_result = db_store_values.result;
        db_result.categories[index].gastos = Number(expenses);

        setExpensesDB(db_result.categories[index].gastos);
        db_promise.put(db_result);
      };
    } catch (err) {
      console.error("ocorreu um erro:", err);
    }
  }
  async function HandleAddExpenses() {
    await HandleAddExpensesToDatabase();
    trigger?.setTrigger((e) => !e);
  }

  useEffect(() => {
    if (visible) {
      const db_set_expenses = async () => {
        try {
          const db_promise = await retrieveStoreToWrite("finances");
          const db_store_values = db_promise.get(2);

          db_store_values.onsuccess = () => {
            const db_result = db_store_values.result;
            setExpensesDB(db_result.categories[index].gastos);
          };

          db_store_values.onerror = (_event) => {
            console.error("Erro ao acessar o store:");
          };
        } catch (err) {
          console.error("Ocorreu um erro:", err);
        }
      };

      db_set_expenses();
    }
  }, [CATEGORIE_CONTEXT_ITEM.activeCategorieModalItem, index]);

  // deletando uma categoria
  const trigger = useContext(TRIGGER_CONTEXT);

  if (!trigger) {
    throw new Error("Ocorreu um erro com o trigger");
  }

  async function HandleDeleteCategorie() {
    try {
      const db_promise = await retrieveStoreToWrite("finances");
      const db_values = db_promise.get(2);

      db_values.onsuccess = () => {
        const db_result = db_values.result;

        const categorie_filtred = db_result.categories.filter(
          (_item: any, idx: number) => {
            return index !== idx;
          }
        );

        db_result.categories = categorie_filtred;

        db_promise.put(db_result);
      };

      HandleCloseModal(handleClose);
      trigger?.setTrigger((e) => !e);
    } catch (err) {
      console.error("ocorreu um erro:", err);
    }
  }

  return (
    <div
      className={`fixed top-0 w-screen h-screen backdrop-blur-sm left-0 justify-center items-center ${
        visible ? "flex" : "hidden"
      } `}
    >
      {/* {Acima overlay} */}
      {/* {Abaixo modal} */}
      <div className="w-fit mobileMedium:w-5/6 tabletMini:w-4/6 min-w-72 h-fit p-5 border-2 border-gray-300 rounded-md bg-white dark:bg-[#1a1a1a] flex flex-col gap-4">
        {/* {Header do modal} */}
        <div className="w-full h-fit flex justify-between items-center">
          <div className="text-lg font-bold mobileMedium:text-lg">Categoria: {categorieName}</div>
          <div className="ml-2">
            <CloseSVG
              onClick={() =>
                HandleCloseModal(
                  handleClose
                )
              }
            />
          </div>
        </div>
        {/* Conteúdo do modal */}
        <div className="w-full h-fit">
          <div>total de gastos: {expensesDB}</div>
        </div>
        <div>
          <input
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            type="text"
            className="mobileMedium:w-full mobileMedium:py-2 mobileMedium:px-3  border-2 border-gray-300 rounded-md px-2 py-1 placeholder:text-sm text-gray-400"
            placeholder="Adicione um valor para gastos..."
          />
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <button
              onClick={HandleAddExpenses}
              className="bg-green-600 text-white font-medium px-2 py-1 rounded-md border border-green-700"
            >
              adicionar gastos
            </button>
          </div>
          <div>
            <button
              onClick={HandleDeleteCategorie}
              className="bg-red-600 text-white font-medium px-2 py-1 rounded-md border border-red-700"
            >
              deletar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
