import { MainTitle } from "./main_title";
import { BalanceButton } from "./add_balance_button";
import { Cards } from "./cards";
import { GraphContainer } from "./graph_container";
import { Categories } from "./main_categorie";
import { Simulate } from "./simulate";

export const MainContainer = () => {
    return (
        <main className="flex flex-col gap-7 w-full h-fit my-5 px-2">
            <MainTitle/>
            <BalanceButton/>
            <section className="w-full flex flex-col gap-3 h-fit">
                <Cards content="Saldo" value={0} />
                <Cards content="Gastos do mês" value={210.00} />
            </section>
            <GraphContainer/>
            <Categories/>
            <Simulate/>
        </main>
    )
}