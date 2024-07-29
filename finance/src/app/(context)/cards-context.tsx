'use client';
import { createContext, Dispatch, SetStateAction } from 'react';

type cardsContextType = {
    generalView: any;
    setGeneralView: any;
}

export const CARDS_CONTEXT = createContext<cardsContextType| null>(null);