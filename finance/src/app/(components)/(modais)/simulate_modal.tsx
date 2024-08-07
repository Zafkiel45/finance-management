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
    const [tableVisible, setTableVisible] = useState<boolean>(false)

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
    },[trigger?.trigger, itemValue]);

    function HandleSimulate() {
        trigger?.setTrigger(e => !e);
        setTableVisible(() => true);
    };
    
    if(!simulateContext) {
        throw new Error("Ocorreu um erro com SimulateContext");
    };
    
    function HandleModalClose() {
        HandleCloseModal(simulateContext?.setSimulateVisible);
        setTableVisible(() => false);
        setItemName('');
        setItemValue('0');
    };

    const saldo_rest = saldoResult < 0 ? 'text-red-400':'text-yellow-400';

    return (
        <div className={`${simulateContext.simulateVisible ? 'flex':'hidden'} fixed top-0 left-0 w-screen h-screen backdrop-blur-sm justify-center items-center z-10`}>
            {/* overlay acima */}
            <div className={`w-fit tabletMini:w-4/6 destkopMini:w-2/4 mobileMedium:w-5/6 h-fit p-4 desktopMedium:p-6 flex border-2 border-gray-400 dark:border-gray-700 bg-white dark:bg-[#111111] rounded-md flex-col justify-center desktopMedium:gap-5 gap-3`}>
                <div className="w-full h-fit flex justify-between">
                    <div className="mobileMedium:text-lg desktopMedium:text-2xl destkopMini:text-xl">
                        Simulação
                    </div>
                    <div>
                        <CloseSVG className={`destkopMini:w-4 desktopMedium:w-6 desktopMedium:h-6 destkopMini:h-4`} onClick={HandleModalClose} />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <input value={itemName} onChange={(e) => setItemName(e.target.value)} className={`mobileMedium:w-full desktopMedium:p-4 desktopMedium:placeholder:text-xl desktopMedium:text-xl mobileMedium:px-3 mobileMedium:py-2 border border-gray-400 rounded-md dark:border-gray-700 px-2 py-1 placeholder:text-sm placeholder:text-gray-400 bg-white dark:bg-[#27272711]`}  type="text" placeholder="Digite o nome do item..."/>
                    </div>
                    <div>
                        <input value={itemValue} onChange={(e) => setItemValue(e.target.value)} className={`mobileMedium:w-full desktopMedium:p-4 desktopMedium:placeholder:text-xl desktopMedium:text-xl mobileMedium:px-3 mobileMedium:py-2 border border-gray-400 rounded-md dark:border-gray-700 px-2 py-1 placeholder:text-sm placeholder:text-gray-400 bg-white dark:bg-[#27272711]`}  type="number" placeholder="Digite o valor do item..."/>
                    </div>
                </div>
                <div className={`${tableVisible ? 'block':'hidden'}`}>
                    <table cellPadding={10} className="text-sm tabletMini:text-base desktopMedium:text-xl border w-full border-gray-400 dark:border-gray-700">
                        <thead>
                            <tr>
                                <th className="p-1 border border-gray-400 dark:border-gray-700 desktopMedium:text-2xl desktopMedium:p-2 tabletMini:text-lg">elemento</th>
                                <th className="p-1 border border-gray-400 dark:border-gray-700 desktopMedium:text-2xl desktopMedium:p-2 tabletMini:text-lg">valor</th>
                                <th className="p-1 border border-gray-400 dark:border-gray-700 desktopMedium:text-2xl desktopMedium:p-2 tabletMini:text-lg">resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">{itemName}</td>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">R$: {Number(itemValue)}</td>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">---</td>
                            </tr>
                            <tr>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">saldo</td>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">R$: {saldo}</td>
                                <td className={`p-1 border border-gray-400 dark:border-gray-700 ${saldo_rest}`}>R$: {saldoResult}</td>
                            </tr>
                            <tr>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">gastos</td>
                                <td className="p-1 border border-gray-400 dark:border-gray-700">R$: {gastos}</td>
                                <td className="p-1 border border-gray-400 dark:border-gray-700 text-yellow-500">R$: {gastosResult}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full h-fit flex justify-end">
                    <button onClick={HandleSimulate} className="bg-[#003362] text-[#eee] py-1 px-2 mobileMedium:px-2 desktopMedium:text-lg mobileMedium:py-2 rounded-md  text-sm border-2 border-[#205D9E]">
                        Simular
                    </button>
                </div>
            </div>
        </div>
    )
}