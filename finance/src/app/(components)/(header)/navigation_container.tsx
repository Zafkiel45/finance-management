import { SwitchButton } from "./switch_button"
import { NavigationButtons } from "./navigation_buttons"

export const NavigationContainer = () => {
    return (
        <nav className="w-full">
            <ol className="flex justify-end items-center flex-row gap-2 w-full">
                <li className="">
                    <NavigationButtons content="Visão Geral" />
                </li>
                <li className="">
                    <NavigationButtons content="Histórico" />
                </li>
                <li className="w-fit h-fit">
                    <SwitchButton/>
                </li>
            </ol>
        </nav>
    )
}