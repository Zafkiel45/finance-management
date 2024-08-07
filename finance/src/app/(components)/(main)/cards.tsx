export const Cards = ({
    value, 
    content,
    categorieName = '',
}:{value: number, content: string, categorieName?: string}) => {
    return (
        <div className="border-2 flex w-full h-fit flex-col gap-2 border-[#414141] rounded-md desktop:py-2 desktopMedium:px-6 desktopMedium:py-4 desktop:px-3 py-1 px-2">
            <div className="text-base mobileMini:text-lg desktopMedium:text-2xl desktop:text-xl">
                {content}
            </div>
            <div className="text-sm mobileMini:text-base  desktopMedium:text-xl desktop:text-lg">
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