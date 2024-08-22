import { createContext, useState } from "react";

export const QuizContext = createContext(null);

export const QuizProvider = ({children}) => {
    const [activeQuiz, setActiveQuiz] = useState(null);

    return <QuizContext.Provider value={{activeQuiz, setActiveQuiz}}>
        {children}
    </QuizContext.Provider>
};