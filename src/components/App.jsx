import General from "./general/General";
import styles from './App.module.css';
// import { QuizContext, QuizProvider } from "../providers/QuizProvider";
import { useContext } from "react";
import QuizCard from "./quiz/quiz-card/QuizCard";

const App = () => {
    return (
        <div className={styles.container}>
            <General/>
        </div>
    );
};

export default App;