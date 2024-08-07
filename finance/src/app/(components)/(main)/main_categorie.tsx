'use client';

import PlusSVG from "../../../../public/svg/plus";
import { useContext, useState, useEffect} from "react";
import { CREATE_SIMPLE_MODAL_CONTEXT } from "@/app/(context)/simple-modal";
import { SimpleModal } from "../(modais)/simpleModal";
import { retrieveStoreToWrite } from "@/app/(utils)/retriveStoreDB";
import { TRIGGER_CONTEXT } from "@/app/(context)/trigger";
import { CategorieModal } from "../(modais)/categorie_modal";
import { CATEGORIE_CONTEXT } from "@/app/(context)/categorie_context";
import { CategorieItemModal } from "../(modais)/categorie_modal_item";

export const Categories = () => {

    const context = useContext(CREATE_SIMPLE_MODAL_CONTEXT);
    let count_categorie: number = 0;
    
    if(!context) {
        throw new Error("isto é nulo");
    };

    function HandleOpenModal() {
        context?.setStateModal2(() => true);
    };

    const [categories, setCategories] = useState<any>();
    const TRIGGER = useContext(TRIGGER_CONTEXT);
    const CATEGORIE_MODAL_CONTEXT = useContext(CATEGORIE_CONTEXT);

    if(!CATEGORIE_MODAL_CONTEXT) {
        throw new Error("OCORREU UM ERRO CO CATEOGORIE MODAL CONTEXT");
    }
    
    async function HandleSetCategories() {
        try {
            const db_promise = await retrieveStoreToWrite('finances');
            const db_item: IDBRequest = db_promise.get(2);
            
            db_item.onsuccess = () => {
                const db_result = db_item.result;
                setCategories(db_result.categories);
            }

        } catch (err) {
            console.error(`ocorreu um erro: ${err}`);
        }
    };

    useEffect(() => {
        const callCategorie = async () => {
            await HandleSetCategories();
        };

        callCategorie();
    }, [TRIGGER?.trigger])

    const [itemModalIndex, setItemModalIndex] = useState<number>(0);
    const [itemModalName, setItemModalName] = useState<string>('');

    function HandleOpenItemModal(index:number, name: string) {

        setItemModalIndex(() => index);
        setItemModalName(() => name);

        CATEGORIE_MODAL_CONTEXT?.setActiveCategorieModalItem(true);
    };

    return (
        <section className="w-full flex flex-col desktopMedium:mt-10 destkopMini:px-6 desktopMedium:px-8 tabletMini:px-4 gap-5 justify-center px-2">
            <div className="w-full h-fit">
                <h1 className="text-xl tabletMini:text-2xl desktopMedium:text-3xl font-bold">
                    Categorias
                </h1>
            </div>
            <div className="w-full h-fit">
                <p className="text-base text-justify tabletMini:text-lg desktopMedium:text-2xl destkopMini:text-xl desktopMedium:leading-10 destkopMini:leading-7">
                    Está é a área de categorias. Aqui você pode separar seus 
                    gastos com base nelas. Por exemplo, crie uma categoria 
                    para “entretenimento” e registre a quantidade de gastos 
                    nessa categoria. Clique para ver os detalhes daquela  
                    categoria específica.
                </p>
            </div>
            <div className="w-full h-fit">
                <button onClick={() => HandleOpenModal()} className="bg-[#003362] flex gap-2 tabletMini:px-3 tabletMini:py-2 desktopMedium:text-lg items-center py-1 px-2 rounded-md text-sm destkopMini:text-base border-2 border-[#205D9E]">
                    <div>
                        <p className="text-[#eee]">
                            Criar categoria
                        </p>
                    </div>
                    <div>
                        <PlusSVG className="fill-[#eee] tabletMini:w-5 desktopMedium:w-6 desktopMedium:h-6 tabletMini:h-5" />
                    </div>
                </button>
            </div>
            <hr className="border-[#414141]"/>
            {/* Container das listas de categoria */}
            <div className="w-full h-fit flex flex-col gap-2 justify-center text-center text-gray-500">
               {categories ? (
                <>
                    {categories.map((item: any, index:number) => {

                        count_categorie++;

                        if(count_categorie <= 3) {
                            return <div key={index * 2}
                                onClick={() => HandleOpenItemModal(index, item.nome)}
                                className="w-full text-[#212121] border-2 cursor-pointer dark:border-gray-600 border-gray-400 dark:text-[#eeee] h-fit p-3 rounded-lg bg-gray-200 dark:bg-[#1a1a1a] desktopMedium:text-xl desktopMedium:p-6 destkopMini:text-lg destkopMini:p-4">
                                {item.nome}
                            </div>
                        }
                    })}
                </>
               ):(
                <>
                    Ops... Pare que você ainda não tem uma categoria. 
                    considere criar uma para visualiza-las aqui.
                </>
               )}
            </div>
            <div className="mt-5 w-full h-fit flex justify-center items-center">
                <button onClick={() => CATEGORIE_MODAL_CONTEXT.setActiveCategorieModal(true)} className="bg-[#003362] text-[#eee] py-1 px-2 rounded-md text-sm tabletMini:text-base desktopMedium:text-lg tabletMini:px-3 border-2 border-[#205D9E]" >
                    Ver mais
                </button>
            </div>
            <SimpleModal 
                content="Crie uma categoria"
                handleFunction={context.setStateModal2}
                inputType="text"
                placeholder="Digite o nome da categoria..."
                state={context.stateModal2}
            />
            <CategorieModal/>
            <CategorieItemModal handleClose={CATEGORIE_MODAL_CONTEXT.setActiveCategorieModalItem} visible={CATEGORIE_MODAL_CONTEXT.activeCategorieModalItem} index={itemModalIndex} categorieName={itemModalName} />
        </section>
    )
}