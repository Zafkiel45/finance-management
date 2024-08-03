'use client';

import { createContext, Dispatch, SetStateAction } from "react";

interface CategorieTypes {
    activeCategorieModal: boolean;
    setActiveCategorieModal: Dispatch<SetStateAction<boolean>>;
    activeCategorieModalItem: boolean;
    setActiveCategorieModalItem: Dispatch<SetStateAction<boolean>>;
    activeCategorieModalItem2: boolean;
    setActiveCategorieModalItem2: Dispatch<SetStateAction<boolean>>;
}


export const CATEGORIE_CONTEXT = createContext<CategorieTypes | null>(null);