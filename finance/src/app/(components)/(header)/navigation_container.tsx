'use client';

import { useContext } from "react";
import { CREATE_SIMPLE_MODAL_CONTEXT } from "@/app/(context)/simple-modal";
import { GeneralModal } from "../(modais)/generalModal";

import { SwitchButton } from "./switch_button"
import { NavigationButtons } from "./navigation_buttons"

export const NavigationContainer = () => {

    const context = useContext(CREATE_SIMPLE_MODAL_CONTEXT);

    if(!context) {
        throw new Error("OOOOOOOOOOOOOOOOOOOOOOO")
    }

    return (
        <nav className="w-full">
            <ol className="flex justify-end items-center flex-row gap-2 mobileMini:gap-4 w-full">
                <li className="">
                    <NavigationButtons HandleOpenModal={context?.setStateModal3} content="Visão Geral" />
                </li>
                <li className="w-fit h-fit">
                    <SwitchButton/>
                </li>
            </ol>
            <GeneralModal 
                handleFunction={context.setStateModal3} 
                state={context.stateModal3}
            />
        </nav>
    )
}