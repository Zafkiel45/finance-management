'use client'
import { MainTitle } from "./main_title";
import { BalanceButton } from "./add_balance_button";
import { Cards } from "./cards";
import { GraphContainer } from "./graph_container";
import { Categories } from "./main_categorie";
import { Simulate } from "./simulate";
import { useRetrieveDB } from "@/app/(hooks)/useRetrieveData";
import { UseIndexedDB } from "@/app/(hooks)/useIndexedDB";

export const MainContainer = () => {
    
    UseIndexedDB({objectStoreName: 'finances', version: 1});

    const DB_VALUES = useRetrieveDB({storeName: 'finances', id: 1});

    if(!DB_VALUES) {
        return <div className="w-screen destkopMini:text-xl dark:text-white h-screen flex justify-center items-center">
            <div className="rounded-full border-b-2 border-gray-950 dark:border-white animate-spin destkopMini:h-5 destkopMini:w-5"></div>
            <div>Loading...</div>
        </div>
    }

    return (
            <main className="flex flex-col gap-7 desktopBig:px-10 desktopMedium:px-8  destkopMini:px-6 tabletMini:gap-5 w-full h-fit  tabletMini:px-4 my-5 px-2">
                <MainTitle/>
                <BalanceButton/>
                <section className="w-full desktopBig:px-10 destkopMini:px-6 desktopMedium:px-8 flex flex-col tabletMini:flex-row gap-3 h-fit">
                    <Cards content="Saldo" value={DB_VALUES.saldo} />
                    <Cards content="Gastos do mês" value={DB_VALUES.gastos_mes} />
                </section>
                <GraphContainer/>
                <Categories/>
                <Simulate/>
            </main>
    )
}