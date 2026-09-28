import { createContext, useContext, useState, type ReactNode } from "react";

type PricePlanContextValue = {
    isAnnual: boolean;
    setIsAnnual: (value: boolean) => void;
};

const PricePlanContext = createContext<PricePlanContextValue>({
    isAnnual: false,
    setIsAnnual: () => {},
});

export function usePricePlan() {
    return useContext(PricePlanContext);
}

export default function PricePlanProvider({ children }: { children: ReactNode }) {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <PricePlanContext.Provider value={{ isAnnual, setIsAnnual }}>
            {children}
        </PricePlanContext.Provider>
    );
}
