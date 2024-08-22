import { useParams } from "react-router-dom";
import QuizCard from "./quiz-card/QuizCard";
import { useEffect, useState } from "react";

const Quiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/quizzes/${id}`);
                const data = await response.json();
                setQuiz(data);
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