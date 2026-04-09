import { createContext, useContext, useState, type JSX, type ReactNode } from "react";
import type { Unit } from "../types";

type UnitContextType =
{
    unit: Unit;
    setUnit: (unit: Unit) => void;
};


const UnitContext = createContext<UnitContextType | undefined>(undefined);


type UnitProviderProps =
{
    children: ReactNode;
};


export function UnitProvider({ children }: UnitProviderProps): JSX.Element
{
    const [unit, setUnit] = useState<Unit>("metric");
    
    return(
        <UnitContext.Provider value={{ unit, setUnit }}>
            {children}
        </UnitContext.Provider>
    );
}


export function useUnit(): UnitContextType
{
    const context: UnitContextType | undefined = useContext(UnitContext);
    
    if (context === undefined)
    {
        throw new Error("useUnit must be used within a UnitPtovider");
    }
    
    return(context);
}
