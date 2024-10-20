import { createContext, useState } from "react";

export const TimerContext = createContext();

export const TimerContextProvider = ({ children }) => {
    const [timer, setTimer] = useState(0);

    return (
        <TimerContext.Provider value={{ timer, setTimer }}>
            {children}
        </TimerContext.Provider>
    );
}