import { NavigationContainer } from "./navigation_container"

export const HeaderContainer = () => {
    return (
        <header className="w-full h-auto p-2 mobileMini:p-4 destkopMini:px-6 desktopMedium:px-8 desktopMedium:py-5 desktopMedium:text-2xl  mobileMini:text-lg border-b border-[#414141]">
            <NavigationContainer/>
        </header>
    )
} 