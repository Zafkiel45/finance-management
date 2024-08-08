export const Cards = ({
    value, 
    content,
    categorieName = '',
}:{value: number, content: string, categorieName?: string}) => {

    const checkCardType = content === 'Saldo' ? true:false;
    //#042002 #084005
    const tailwindHover = checkCardType ? {
        colors: 'hover:bg-[#0F2E22] hover:border-[#2A7E68] hover:text-[#ADF0D4] dark:hover:bg-[#042002] dark:hover:border-[#084005] dark:hover:text-[#00A807]'
    }: {
        colors: 'hover:bg-[#391714] hover:border-[#AC4D39] hover:text-[#FBD3CB] dark:hover:bg-[#200906] dark:hover:border-[#800B0A] dark:hover:text-[#FF625D]'
    }

    return (
        <div className={`${tailwindHover.colors} transition-colors border-2 flex w-full h-fit flex-col gap-2 border-[#414141] rounded-md desktop:py-2 desktopMedium:px-6 desktopMedium:py-4 desktop:px-3 py-1 px-2`}>
            <div className="text-base mobileMini:text-lg desktopMedium:text-2xl desktopBig:text-3xl desktop:text-xl">
                {content}
            </div>
            <div className="text-sm mobileMini:text-base  desktopMedium:text-xl desktopBig:text-2xl desktop:text-lg">
                {categorieName !== '' ? (
                    <>
                        {categorieName}
                    </>
                ):(
                    <>
                     R$: {value}
                    </>
                )}
            </div>
        </div>
    )
}