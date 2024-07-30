'use client'
import PlusSVG from '../../../../public/svg/plus';
import { SimpleModal } from '../(modais)/simpleModal';
import { useContext } from 'react';
import { CREATE_SIMPLE_MODAL_CONTEXT } from '../../(context)/simple-modal';

export const BalanceButton = () => {

    const SimpleModalContext = useContext(CREATE_SIMPLE_MODAL_CONTEXT);

    if(!SimpleModalContext) {
        throw new Error("Ocorreu um erro com o SimpleModalContext");
    };

    return (
        <section className="w-full h-fit">
            <button onClick={() => {SimpleModalContext.setStateModal1(true)}} className="border-2 flex gap-1 items-center py-1 px-2 text-sm border-[#414141] rounded-md">
                <div>
                    <PlusSVG className="fill-[#212121] dark:fill-[#eee]"/>
                </div>
                <div>
                    Adicionar saldo
                </div>
            </button>
            <SimpleModal 
                content='Adicionar Saldo' 
                placeholder='Digite o valor do seu saldo...' 
                inputType='number'
                handleFunction={SimpleModalContext.setStateModal1}
                state={SimpleModalContext.stateModal1}
            />
        </section>
    )
}

/*


*/