'use client';

import { createContext, Dispatch, SetStateAction } from "react";

interface SimulateTypes {
    simulateVisible: boolean;
    setSimulateVisible: Dispatch<SetStateAction<boolean>>;
};

export const SIMULATE_CONTEXT = createContext<SimulateTypes | null>(null);