import PlusSVG from "../../../../public/svg/plus"

export const Categories = () => {
    return (
        <section className="w-full flex flex-col gap-5 justify-center px-2 my-10">
            <div className="w-full h-fit">
                <h1 className="text-xl font-bold">
                    Categorias
                </h1>
            </div>
            <div className="w-full h-fit">
                <p className="text-base text-justify">
                    Está é a área de categorias. Aqui você pode separar seus 
                    gastos com base nelas. Por exemplo, crie uma categoria 
                    para “entretenimento” e registre a quantidade de gastos 
                    nessa categoria. Clique para ver os detalhes daquela  
                    categoria específica.
                </p>
            </div>
            <div className="w-full h-fit">
                <button className="bg-[#003362] flex gap-2 items-center py-1 px-2 rounded-md text-sm border-2 border-[#205D9E]">
                    <div>
                        <p className="text-[#eee]">
                            Criar categoria
                        </p>
                    </div>
                    <div>
                        <PlusSVG className="fill-[#eee]" />
                    </div>
                </button>
            </div>
            <hr className="border-[#414141]"/>
            {/* Container das listas de categoria */}
            <div className="w-full h-fit text-center text-gray-500">
               Ops... Pare que você ainda não tem uma categoria. 
               considere criar uma para visualiza-las aqui.
            </div>
            <div className="mt-5 w-full h-fit flex justify-center items-center">
                <button className="bg-[#003362] text-[#eee] py-1 px-2 rounded-md text-sm border-2 border-[#205D9E]" >
                    Ver mais
                </button>
            </div>
        </section>
    )
}