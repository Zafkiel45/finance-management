"use client";
import PlusSVG from "../../../../public/svg/plus";
import { SimpleModal } from "../(modais)/simpleModal";
import { useContext } from "react";
import { CREATE_SIMPLE_MODAL_CONTEXT } from "../../(context)/simple-modal";

import MinusSvg from "../../../../public/svg/menus";

export const BalanceButton = () => {
  const SimpleModalContext = useContext(CREATE_SIMPLE_MODAL_CONTEXT);

  if (!SimpleModalContext) {
    throw new Error("Ocorreu um erro com o SimpleModalContext");
  }

  return (
    <section className="w-full h-fit destkopMini:px-6 desktopBig:px-10 desktopMedium:px-8 flex gap-2">
      <div>
        <button
          onClick={() => {
            SimpleModalContext.setStateModal1(true);
          }}
          className="destkopMini:dark:hover:bg-[#2b2b2b81] destkopMini:hover:bg-[#2121211a] destkopMini:transition-all border-2 flex gap-1 items-center py-1 px-2 tabletMini:px-3 tabletMini:py-2 desktopMedium:px-4 desktopMedium:py-3 desktopMedium:text-lg text-xs desktopBig:text-xl mobileMini:text-base border-[#414141] rounded-md"
        >
          <div>
            <PlusSVG className="fill-[#212121] desktopMedium:w-5 desktopBig:w-6 desktopBig:h-6 desktopMedium:h-5 dark:fill-[#eee]" />
          </div>
          <div>Adicionar saldo</div>
        </button>
      </div>
      <div className="relative w-fit h-fit">
        <button
          onClick={() => {
            SimpleModalContext.setStateModal5(true);
          }}
          className="destkopMini:dark:hover:bg-[#2b2b2b81] destkopMini:hover:bg-[#2121211a]  transition-colors border-2 flex gap-1 items-center py-1 px-2  tabletMini:px-3 tabletMini:py-2 desktopMedium:px-4 desktopMedium:py-3 text-xs desktopMedium:text-lg desktopBig:text-xl mobileMini:text-base border-[#414141] rounded-md"
        >
          <div>
            <PlusSVG className="fill-[#212121] desktopMedium:w-5 desktopBig:w-6 desktopBig:h-6 desktopMedium:h-5 dark:fill-[#eee]" />
          </div>
          <div>Adicionar gastos</div>
        </button>
      </div>
      <SimpleModal
        content="Adicionar Saldo"
        placeholder="Digite o valor do seu saldo..."
        inputType="number"
        handleFunction={SimpleModalContext.setStateModal1}
        state={SimpleModalContext.stateModal1}
        handleType="saldo"
      />
      <SimpleModal
        content="Adicionar gastos"
        placeholder="Digite o valor do seus gastos..."
        inputType="number"
        handleType="gastos"
        handleFunction={SimpleModalContext.setStateModal5}
        state={SimpleModalContext.stateModal5}
      />
    </section>
  );
};
