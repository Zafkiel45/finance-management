"use client";

import { createContext, Dispatch, SetStateAction } from "react";

interface SimpleModalTypes {
  stateModal1: boolean;
  stateModal2: boolean;
  setStateModal1: Dispatch<SetStateAction<boolean>>;
  setStateModal2: Dispatch<SetStateAction<boolean>>;
}

export const CREATE_SIMPLE_MODAL_CONTEXT =
  createContext<SimpleModalTypes | null>(null);
