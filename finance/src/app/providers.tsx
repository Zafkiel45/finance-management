"use client";

import { useState } from "react";
import { CREATE_SIMPLE_MODAL_CONTEXT } from "./(context)/simple-modal";
import { HeaderContainer } from "./(components)/(header)/header_container";
import { MainContainer } from "./(components)/(main)/main_container";
import { TRIGGER_CONTEXT } from "./(context)/trigger";
import { CATEGORIE_CONTEXT } from "./(context)/categorie_context";

export const AllElements = () => {

  // modal Context
  const [stateModal1, setStateModal1] = useState<boolean>(false);
  const [stateModal2, setStateModal2] = useState<boolean>(false);
  const [stateModal3, setStateModal3] = useState<boolean>(false);
  const [stateModal4, setStateModal4] = useState<boolean>(false);
  // trigger context
  const [trigger, setTrigger] = useState<boolean>(false);
  // categorie context
  const [activeCategorieModal, setActiveCategorieModal] = useState<boolean>(false); 
  const [activeCategorieModalItem, setActiveCategorieModalItem] = useState<boolean>(false); 
  const [activeCategorieModalItem2, setActiveCategorieModalItem2] = useState<boolean>(false); 

  return (
    <>
      <CREATE_SIMPLE_MODAL_CONTEXT.Provider
        value={{
          stateModal1,
          stateModal2,
          stateModal3,
          stateModal4,
          setStateModal1,
          setStateModal2,
          setStateModal3,
          setStateModal4,
        }}
      >
        <TRIGGER_CONTEXT.Provider value={{trigger, setTrigger}}>
          <CATEGORIE_CONTEXT.Provider value={{
            setActiveCategorieModal, 
            activeCategorieModal,
            activeCategorieModalItem,
            setActiveCategorieModalItem,
            activeCategorieModalItem2,
            setActiveCategorieModalItem2
          }}>
            <HeaderContainer />
            <MainContainer />
          </CATEGORIE_CONTEXT.Provider>
        </TRIGGER_CONTEXT.Provider>
      </CREATE_SIMPLE_MODAL_CONTEXT.Provider>
    </>
  );
};
