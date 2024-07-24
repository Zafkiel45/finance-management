export const Simulate = () => {
    return (
        <section className="px-2 my-5 w-full h-fit flex flex-col gap-4 justify-center">
            <div className="w-full h-fit">
                <h1 className="font-bold text-xl">
                    Simulações
                </h1>
            </div>
            <div className="w-full h-fit">
                <p className="text-justify">
                    Simule transações antes de efetuar a compra de algo e 
                    visualize quanto de saldo irá restar após  a transação. 
                </p>
            </div>
            <div className="w-full h-fit">
                <details>
                    <summary>Explicação completa</summary>
                    <p> Este é um texto escondido</p>
                </details>
            </div>
            <div>
                <button className="bg-[#003362] text-[#eee] py-1 px-2 rounded-md text-sm border-2 border-[#205D9E]" >
                    Simular
                </button>
            </div>
        </section>
    )
}