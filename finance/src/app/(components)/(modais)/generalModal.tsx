'use client';

import { useEffect, useContext, useState } from "react";
import { useRetrieveDB } from "@/app/(hooks)/useRetrieveData";
import { TRIGGER_CONTEXT } from "@/app/(context)/trigger";
import { retrieveStoreToWrite } from "@/app/(utils)/retriveStoreDB";

import { 
    Dispatch, 
    SetStateAction, 
} from "react";

import CloseSVG from "../../../../public/svg/close";
import { Cards } from "../(main)/cards";
import { GraphContainer } from "../(main)/graph_container";
import { HandleCloseModal } from "@/app/(utils)/closeModal";


interface TypeArg {
    state: boolean;
    handleFunction: Dispatch<SetStateAction<boolean>>;
}

export const GeneralModal = ({
    state,
    handleFunction
}: TypeArg) => {

    const db_value = useRetrieveDB({storeName: 'finances', id: 1});
    const [expenseCategorie, setExpenseCategorie] = useState<any>([]);

    const trigger = useContext(TRIGGER_CONTEXT);

    useEffect(() => {
        const db_compare = async () => {
            try {
                const db_store = await retrieveStoreToWrite('finances');
                const db_values = db_store.get(2);

                db_values.onsuccess = () => {
                    const result = db_values.result;

                    const compare_result = result.categories.sort((a: any, b:any) => {
                        return a.gastos - b.gastos;
                    });

                    setExpenseCategorie(() => compare_result);
                }
            } catch(err) {  
                console.error('ocorreu um erro:', err);
            }
        }

        db_compare();
    }, [trigger?.trigger])

    const stateModal = state ? 'flex':'hidden';
    
    if(!db_value || !expenseCategorie) {
        return <div>Loading general data...</div>
    };

    const check = expenseCategorie.length !== 0 ? expenseCategorie[expenseCategorie.length -1].nome: '';

    return (
        <div className={`${stateModal} z-20 fixed dark:bg-[#111111] overflow-auto bg-white top-0 left-0 w-screen h-screen px-4 py-5 flex justify-center items-center`}>
            <div className="w-full h-full flex max-h-screen flex-col gap-5">
                <header className="w-full h-fit flex justify-between items-center">
                    <div className="font-medium">
                        Visão Geral
                    </div>
                    <div>
                        <CloseSVG onClick={() => {
                            HandleCloseModal(handleFunction);
                            document.body.style.overflowY = 'visible';
                        }}  />
                    </div>
                </header>
                <main className="w-full h-fit flex flex-col gap-4 justify-center">
                    <div className="w-full h-fit flex flex-col justify-center gap-2">
                        <Cards content="Saldo" value={db_value.saldo} />
                        <Cards  content="Gastos totais" value={db_value.gastos_mes}/>
                        <Cards content="Categoria com mais despesas" value={0} categorieName={check} />
                    </div>
                    <div className="w-full h-fit">
                        <GraphContainer/>
                    </div>
                </main>
            </div>
        </div>
    )
}