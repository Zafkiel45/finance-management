"use client";

import { useState } from "react";
import { CREATE_SIMPLE_MODAL_CONTEXT } from "./(context)/simple-modal";
import { HeaderContainer } from "./(components)/(header)/header_container";
import { MainContainer } from "./(components)/(main)/main_container";

export const AllElements = () => {
  const [stateModal1, setStateModal1] = useState<boolean>(false);
  const [stateModal2, setStateModal2] = useState<boolean>(false);
  const [stateModal3, setStateModal3] = useState<boolean>(false);
  const [stateModal4, setStateModal4] = useState<boolean>(false);

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
        <HeaderContainer />
        <MainContainer />
      </CREATE_SIMPLE_MODAL_CONTEXT.Provider>
    </>
  );
};
