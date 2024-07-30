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
        return <div className="w-screen h-screen flex justify-center items-center">
            Loading...
        </div>
    }

    return (
        
            <main className="flex flex-col gap-7 w-full h-fit my-5 px-2">
                <MainTitle/>
                <BalanceButton/>
                <section className="w-full flex flex-col gap-3 h-fit">
                    <Cards content="Saldo" value={DB_VALUES.saldo} />
                    <Cards content="Gastos do mês" value={DB_VALUES.gastos_mes} />
                </section>
                <GraphContainer/>
                <Categories/>
                <Simulate/>
            </main>
    )
}