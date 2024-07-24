export const Cards = ({
    value, 
    content
}:{value: number, content: string}) => {
    return (
        <div className="border-2 flex w-full h-fit flex-col gap-2 border-[#414141] rounded-md py-1 px-2">
            <div>
                {content}
            </div>
            <div>
                R$: {value}
            </div>
        </div>
    )
}