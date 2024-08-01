'use client';

// contexts
import { CATEGORIE_CONTEXT } from "@/app/(context)/categorie_context";
// hooks
import { useContext, useState, useEffect } from "react";
// svgs 
import CloseSVG from "../../../../public/svg/close";
// utils 
import { HandleCloseModal } from "@/app/(utils)/closeModal";
import { retrieveStoreToWrite } from "@/app/(utils)/retriveStoreDB";
import { TRIGGER_CONTEXT } from "@/app/(context)/trigger";
// interfaces 
interface propsTypes {
    index: number;
    categorieName: string;
    gastos: number;
}

export const CategorieItemModal = ({
    index,
    categorieName,
    gastos,
}: propsTypes) => {

    // contexto de gerencimento de estado do modal entre: HIDDEN || FLEX
    const CATEGORIE_CONTEXT_ITEM = useContext(CATEGORIE_CONTEXT);

    if(!CATEGORIE_CONTEXT_ITEM) {
        throw new Error("Ocorreu um erro ao acessar: CATEGORIE_CONTEXT_ITEM");
    }
    // Recuperação de valores no banco de dados:
    const TRIGGER = useContext(TRIGGER_CONTEXT);

    const [expensesDB, setExpensesDB] = useState<number>();
    const [expenses, setExpenses] = useState<string>('');

    async function HandleAddExpensesToDatabase() {
        try {
            const db_promise = await retrieveStoreToWrite('finances');
            const db_store_values = db_promise.get(2);

            db_store_values.onsuccess = () => {
                const db_result = db_store_values.result;
                db_result.categories[index].gastos = Number(expenses);

                setExpensesDB(db_result.categories[index].gastos);
                db_promise.put(db_result);
            };
        } catch(err) {
            console.error('ocorreu um erro:', err);
        }
    }
    async function HandleAddExpenses() {
        await HandleAddExpensesToDatabase();
    };

    useEffect(() => {
        if (CATEGORIE_CONTEXT_ITEM.activeCategorieModalItem) {
            const db_set_expenses = async () => {
                try {
                    const db_promise = await retrieveStoreToWrite('finances');
                    const db_store_values = db_promise.get(2);

                    db_store_values.onsuccess = () => {
                        const db_result = db_store_values.result;
                        setExpensesDB(db_result.categories[index].gastos);
                    };

                    db_store_values.onerror = (event) => {
                        console.error('Erro ao acessar o store:');
                    };
                } catch (err) {
                    console.error('Ocorreu um erro:', err);
                }
            }

            db_set_expenses();
        }
    }, [CATEGORIE_CONTEXT_ITEM.activeCategorieModalItem, index]);

    console.log(expensesDB)

    return (
        <div className={`fixed top-0 w-screen h-screen backdrop-blur-sm left-0 justify-center items-center ${CATEGORIE_CONTEXT_ITEM.activeCategorieModalItem ? 'flex':'hidden'} `}>
            {/* {Acima overlay} */}
            {/* {Abaixo modal} */}
            <div className="w-fit min-w-72 h-fit p-5 border-2 border-gray-300 rounded-md bg-white dark:bg-[#1a1a1a] flex flex-col gap-4">
                {/* {Header do modal} */}
                <div className="w-full h-fit flex justify-between items-center">
                    <div className="text-lg font-bold">
                        Categoria: {categorieName}
                    </div>
                    <div className="ml-2">
                        <CloseSVG onClick={() => 
                            HandleCloseModal(CATEGORIE_CONTEXT_ITEM.setActiveCategorieModalItem)
                        } 
                        />
                    </div>
                </div>
                {/* Conteúdo do modal */}
                <div className="w-full h-fit">
                    <div>
                        total de gastos: {expensesDB}
                    </div>
                </div>
                <div>
                    <input value={expenses} onChange={(e) => setExpenses(e.target.value)} type="text" className="border-2 border-gray-300 rounded-md px-2 py-1 placeholder:text-sm text-gray-400" placeholder="Adicione um valor para gastos..." />
                </div>
                <div className="flex gap-2 items-center">
                    <div>
                        <button onClick={HandleAddExpenses} className="bg-green-600 text-white font-medium px-2 py-1 rounded-md border border-green-700">
                            adicionar gastos
                        </button>
                    </div>
                    <div>
                        <button className="bg-red-600 text-white font-medium px-2 py-1 rounded-md border border-red-700">
                            deletar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}