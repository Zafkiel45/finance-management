import { NavigationContainer } from "./navigation_container"

export const HeaderContainer = () => {
    return (
        <header className="w-full h-auto p-2 mobileMini:p-4 mobileMini:text-lg border-b border-[#414141]">
            <NavigationContainer/>
        </header>
    )
} 