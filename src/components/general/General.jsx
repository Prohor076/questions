import { useEffect, useState } from "react";
import GeneralCard from "./general-card/GeneralCard";
import styles from './General.module.css';

const General = () => {
    const [quizzesList, setQuizzes] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://prohor076.github.io/questions/database/db.json`);
                const data = await response.json();
                setQuizzes(data['quizzes']);
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