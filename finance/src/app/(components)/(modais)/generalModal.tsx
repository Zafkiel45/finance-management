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

    const stateModal = state ? 'flex':'hidden';

    return (
        <div className={`${stateModal} fixed dark:bg-[#111111] overflow-x-hidden overflow-auto bg-white top-0 left-0 w-screen min-h-screen h-fit px-4 py-5 flex justify-center items-center`}>
            <div className="w-full h-full flex flex-col gap-5">
                <header className="w-full h-fit flex justify-between items-center">
                    <div className="font-medium">
                        Visão Geral
                    </div>
                    <div>
                        <CloseSVG onClick={() => {
                            HandleCloseModal(handleFunction);
                            document.body.style.overflowY = 'visible'
                        }}  />
                    </div>
                </header>
                <main className="w-full h-fit flex flex-col gap-4 justify-center">
                    <div className="w-full h-fit flex flex-col justify-center gap-2">
                        <Cards content="Saldo" value={232.00} />
                        <Cards  content="Gastos mensais" value={223.00}/>
                        <Cards  content="Gastos semanais" value={2323232.00}/>
                        <Cards content="Categoria com mais despesas" value={2393.00} />
                    </div>
                    <div className="w-full h-fit">
                        <GraphContainer/>
                    </div>
                </main>
            </div>
        </div>
    )
}