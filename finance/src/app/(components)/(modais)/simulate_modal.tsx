'use client';

import { useContext, useState, useEffect } from "react";
import { HandleCloseModal } from "@/app/(utils)/closeModal";
import { SIMULATE_CONTEXT } from "@/app/(context)/simulate_context";
import { TRIGGER_CONTEXT } from "@/app/(context)/trigger";
import { retrieveStoreToWrite } from "@/app/(utils)/retriveStoreDB";

import CloseSVG from "../../../../public/svg/close";

export const SimulateModal = () => {

    const simulateContext = useContext(SIMULATE_CONTEXT);
    const [itemValue, setItemValue] = useState<string>('0');
    const [itemName, setItemName] = useState<string>('');
    const [gastos, setGastos] = useState<any>(0);
    const [saldo, setSaldo] = useState<any>(0);
    const [gastosResult, setGastosResult] = useState<number>(0);
    const [saldoResult, setSaldoResult] = useState<number>(0);

    const trigger = useContext(TRIGGER_CONTEXT)

    useEffect(() => {
        const db_values = async () => {
            try {
                const db_store = await retrieveStoreToWrite('finances');
                const db_values = db_store.get(1);

                db_values.onsuccess = () => {
                    const db_result = db_values.result;

                    setGastos(db_result.gastos_mes);
                    setGastosResult(db_result.gastos_mes + Number(itemValue));
                    setSaldo(db_result.saldo);
                    setSaldoResult(db_result.saldo - Number(itemValue));
                };

            } catch (err) {
                console.error(err);
            }
        }

        db_values();
    },[trigger?.trigger])

    if(!simulateContext) {
        throw new Error("Ocorreu um erro com SimulateContext");
    };

    // if(!gastos || !saldo) {
    //     return <div>carregando dados...</div>
    // };

    return (
        <div className={`${simulateContext.simulateVisible ? 'flex':'hidden'} fixed top-0 left-0 w-screen h-screen backdrop-blur-sm justify-center items-center z-10`}>
            {/* overlay acima */}
            <div className={`w-fit h-fit p-4 flex border-2 border-gray-400 dark:border-gray-700 bg-white dark:bg-[#111111] rounded-md flex-col justify-center gap-3`}>
                <div className="w-full h-fit flex justify-between">
                    <div>
                        Simulação
                    </div>
                    <div>
                        <CloseSVG onClick={() => HandleCloseModal(simulateContext.setSimulateVisible)} />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <input value={itemName} onChange={(e) => setItemName(e.target.value)} className={`border border-gray-400 rounded-md dark:border-gray-700 px-2 py-1 placeholder:text-sm placeholder:text-gray-400 bg-white dark:bg-[#27272711]`}  type="text" placeholder="Digite o nome do item..."/>
                    </div>
                    <div>
                        <input value={itemValue} onChange={(e) => setItemValue(e.target.value)} className={`border border-gray-400 rounded-md dark:border-gray-700 px-2 py-1 placeholder:text-sm placeholder:text-gray-400 bg-white dark:bg-[#27272711]`}  type="number" placeholder="Digite o valor do item..."/>
                    </div>
                </div>
                <div>
                    <table cellPadding={10} className="text-sm border w-full border-gray-400 dark:border-gray-700">
                        <thead>
                            <tr>
                                <th className="p-1 border border-gray-400 dark:border-gray-700">elemento</th>
                                <th className="p-1 border border-gray-400 dark:border-gray-700">valor</th>
                                <th className="p-1 border border-gray-400 dark:border-gray-700">resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">R$: {itemName}</td>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">R$: {Number(itemValue)}</td>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">---</td>
                            </tr>
                            <tr>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">R$: saldo</td>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">R$: {saldo}</td>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">R$: {saldoResult}</td>
                            </tr>
                            <tr>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">R$: gastos</td>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">R$: {gastos}</td>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">R$: {gastosResult}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full h-fit flex justify-end">
                    <button onClick={() => trigger?.setTrigger(e => !e)} className="bg-[#003362] text-[#eee] py-1 px-2 rounded-md text-sm border-2 border-[#205D9E]">
                        Simular
                    </button>
                </div>
            </div>
        </div>
    )
}