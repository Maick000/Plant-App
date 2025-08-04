import { createContext, useContext } from "react";

export const PlantsContext = createContext();

export const usePlants = () => {
    const context = useContext(PlantsContext)

    if(!context){
        throw new Error("usePlants must be used within a plantsProvider")
    }

    return context;
}