'use client';
import { createContext, Dispatch, SetStateAction } from 'react';

interface triggerType {
    trigger: boolean;
    setTrigger: Dispatch<SetStateAction<boolean>>;
}


    export const TRIGGER_CONTEXT = createContext<triggerType | null>(null);