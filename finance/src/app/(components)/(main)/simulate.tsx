'use client';

import { useContext } from "react";
import { SIMULATE_CONTEXT } from "@/app/(context)/simulate_context";
import { SimulateModal } from "../(modais)/simulate_modal";

export const Simulate = () => {

    const simulate = useContext(SIMULATE_CONTEXT);

    if(!simulate) {
        throw new Error("Ops...Ocorreu um erro com simulate");
    }

    function HandleOpenSimulateModal():void {
        simulate?.setSimulateVisible(true);
    };

    return (
        <section className="px-2 desktopBig:px-10 desktopMedium:px-8 destkopMini:px-6  w-full h-fit flex flex-col gap-4 justify-center">
            <div className="w-full h-fit">
                <h1 className="font-bold desktopBig:mt-2 text-xl desktopMedium:text-3xl desktopBig:text-4xl destkopMini:text-2xl">
                    Simulações
                </h1>
            </div>
            <div className="w-full desktopBig:my-2 h-fit">
                <p className="text-justify tabletMini:text-lg desktopBig:text-3xl desktopMedium:text-2xl destkopMini:text-xl">
                    Simule transações antes de efetuar a compra de algo e 
                    visualize quanto de saldo irá restar após  a transação. 
                </p>
            </div>
            <div className="w-full h-fit">
                <details>
                    <summary className="font-semibold italic desktopMedium:text-2xl destkopMini:text-xl">Explicação completa</summary>
                    <p className="mt-3 desktopBig:mt-7 desktopBig:p-3 italic text-sm desktopMedium:text-xl desktopBig:text-2xl mobileMini:text-base destkopMini:text-lg"> 
                        O intuito da simulação, é para que você tenha uma noção 
                        do quanto irá gastar, e do quanto irá restar de saldo.
                        <br />
                        <br />
                        Quando clicar no botão &quot;simular&quot;, o valor do item será
                        subtraido do saldo e somado aos gastos e mostra para 
                        você quanto resta e os gastos totais (com o valor do item somado).
                    </p>
                </details>
            </div>
            <div>
                <button onClick={HandleOpenSimulateModal} className="bg-[#003362] text-[#eee] py-1 px-2 rounded-md desktopBig:text-2xl desktopBig:mt-4 tabletMini:text-base desktopMedium:text-lg tabletMini:px-3 desktopBig:px-5 text-sm border-2 border-[#205D9E]" >
                    Simular
                </button>
            </div>
            <SimulateModal/>
        </section>
    )
}