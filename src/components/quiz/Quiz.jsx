import { useParams } from "react-router-dom";
import QuizCard from "./quiz-card/QuizCard";
import { useEffect, useState } from "react";

const Quiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://prohor076.github.io/questions/database/db.json');
                const data = await response.json();

                // Преобразуем id к типу number, если id в JSON-е - число
                const quizId = Number(id);

                const quiz = data['quizzes'].find(quiz => quiz.id === quizId);

                if (quiz) {
                    setQuiz(quiz);
                } else {
                    console.error('Quiz not found');
                }
            } catch (error) {
                <div>Не удалось подключиться к БД</div>
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <QuizCard id={id} quiz={quiz}/>
        </>
    );
};

export default Quiz;