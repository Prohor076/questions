import { useEffect, useState } from "react";
import GeneralCard from "./general-card/GeneralCard";
import styles from './General.module.css';

const General = () => {
    const [quizzesList, setQuizzes] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/quizzes`);
                const data = await response.json();
                setQuizzes(data);
            } catch (error) {
                <div>Не удалось подключиться к БД</div>
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.containerItem}>
            <div className={styles.cardList}>
                {quizzesList && quizzesList.map(quiz => {
                    return <GeneralCard key={quiz['id']} quiz={quiz} />
                })}
            </div>
        </div>
    );
};

export default General;