import PlusSVG from '../../../../public/svg/plus';

export const BalanceButton = () => {
    return (
        <section className="w-full h-fit">
            <button className="border-2 flex gap-1 items-center py-1 px-2 text-sm border-[#414141] rounded-md">
                <div>
                    <PlusSVG/>
                </div>
                <div>
                    Adicionar saldo
                </div>
            </button>
        </section>
    )
}