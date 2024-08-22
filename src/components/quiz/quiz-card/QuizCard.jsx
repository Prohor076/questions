import { Link } from 'react-router-dom';
import styles from './QuizCard.module.css';
import { useState } from 'react';
import CircularProgress from '@mui/joy/CircularProgress';
import Checkbox, { checkboxClasses } from '@mui/joy/Checkbox';
import Sheet from '@mui/joy/Sheet';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const QuizCard = ({quiz}) => {
    const [answer, setAnswer] = useState(1);
    const [history, setHistory] = useState([]);
    const [progress, setProgress] = useState(0);
    const [finish, setFinish] = useState(false);
    const [timer, setTimer] = useState(0);
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const getCorrectlyAnswers = () => {
        let result = [];
        quiz.answers.map(answer => {
            answer.options.map(option => {
                if (option.correctly) result.push(option)
            });
        });
        return result;
    };
    const onSubmit = (data) => {
        setHistory(prev => [...prev, data]);
        console.log(data);
        reset();
    };

    useEffect(() => {
        const id = setInterval(() => {
            setTimer(prev => prev + 1); // Этот эффект зависит от переменной состояния `count`
          }, 1000);
        return () => clearInterval(id);
        // setInterval(() => {
        //     setTimer(prev => prev + 1);
        // }, 1000);
    }, []);

    // {quiz && console.log(getCorrectlyAnswers())}

    return (
        <>
            <div className={styles.quiz}>
                {quiz ?
                    <div className={styles.quizItems}>
                        <div className={styles.quizItems}>
                            <div className={styles.quizItemsLeft}>
                                <div className={styles.quizItemsLeftList}>
                                    <div className={styles.quizItemsLeftListName}>
                                        <div className={styles.quizItemsLeftListNameDesc}>Название:</div>
                                        <div className={styles.quizItemsLeftListNameValue}>{quiz.name}</div>
                                    </div>
                                    <div className={styles.quizItemsLeftListID}>ID: <span>{quiz.id}</span></div>
                                    <div className={styles.quizItemsLeftListProgress}>
                                        <div className={styles.quizItemsLeftListProgressBar}>
                                            <CircularProgress
                                                sx={{
                                                    "--CircularProgress-progressColor": "var(--main-color)",
                                                    "--CircularProgress-size": "200px"
                                                }}
                                                determinate
                                                value={
                                                    (progress * 100).toFixed(2)
                                                }
                                            />
                                        </div>
                                        <div className={styles.quizItemsLeftListProgressText}>
                                            <div className={styles.quizItemsLeftListProgressTextDesc}>Прогресс</div>
                                            <div className={styles.quizItemsLeftListProgressTextValue}>
                                                {(progress * 100).toFixed(2)}%
                                            </div>
                                        </div>
                                    </div>
                                    {/* {console.log(quiz)} */}
                                    <div className={styles.quizItemsLeftListInfo}>
                                        <div className={styles.quizItemsLeftListInfoBlock}>
                                            <div className={styles.quizItemsLeftListInfoBlockIcon}>
                                                <img src="/assets/icons/clock2.svg" alt="" />
                                            </div>
                                            <div className={styles.quizItemsLeftListInfoBlockText}>
                                                <div className={styles.quizItemsLeftListInfoBlockDesc}>Вопросов</div>
                                                <div className={styles.quizItemsLeftListInfoBlockValue}>{quiz.answers.length}</div>
                                            </div>
                                        </div>
                                        <div className={styles.quizItemsLeftListInfoBlock}>
                                            <div className={styles.quizItemsLeftListInfoBlockIcon}>
                                                <img src="/assets/icons/clock2.svg" alt="" />
                                            </div>
                                            <div className={styles.quizItemsLeftListInfoBlockText}>
                                                <div className={styles.quizItemsLeftListInfoBlockDesc}>Время</div>
                                                <div className={styles.quizItemsLeftListInfoBlockValue}>{quiz.time}:00</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.quizItemsRight}>
                                <div className={styles.quizItemsRightItems}>
                                    <Link to={`/`} className={styles.quizItemsRightItemsBackLink}>
                                        <div className={styles.quizItemsRightItemsBack}>
                                            <div className={styles.quizItemsRightItemsBackIcon}>
                                                <img src="/assets/icons/arrow-left.svg" alt="" />
                                            </div>
                                            <div className={styles.quizItemsRightItemsBackText}>Обратно к тестам ({timer})</div>
                                        </div>
                                    </Link>
                                    {!finish && 
                                        <>
                                            <div className={styles.quizItemsRightItemsCount}>
                                                <div className={styles.quizItemsRightItemsCountItems}>
                                                    <div className={styles.quizItemsRightItemsCountItemsCurrent}>{answer}</div>
                                                    <div className={styles.quizItemsRightItemsCountItemsTotal}>{quiz.answers.length}</div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {/* {console.log(finish)} */}
                                        {!finish ? 
                                            <>
                                                {quiz.answers.map(answerItem => {
                                                    return (answerItem.id == answer) &&
                                                    <>
                                                        <div className={styles.quizItemsRightItemsText}>
                                                            <div className={styles.quizItemsRightItemsTextItems}>
                                                                <div className={styles.quizItemsRightItemsTextItemsTitle}>{answerItem['text']}</div>
                                                                <div className={styles.quizItemsRightItemsTextItemsDesc}>Выберите один из вариантов ответа</div>
                                                            </div>
                                                        </div>
                                                        <div className={styles.quizItemsRightItemsOptions}>
                                                            <div className={styles.quizItemsRightItemsOptionsList}>
                                                                {/* {console.log(quiz.answers[0]['options'])} */}
                                                                {answerItem['options'].map(option => {
                                                                    return (
                                                                        <>
                                                                            <div className={styles.quizItemsRightItemsOptionsListItem} key={option['text']}>
                                                                                {/* <input id={`answer${option.id}`} type="radio" defaultValue={option['text']} {...register(`answer${option.id}`, {required: true})} /> */}
                                                                                <input
                                                                                    {...register(`answer`)}
                                                                                    type="radio"
                                                                                    value={option['text']}
                                                                                    id={`answer${option.id}`}
                                                                                />
                                                                                {/* <div className={styles.quizItemsRightItemsOptionsListItemCheckbox}></div> */}
                                                                                <label htmlFor={`answer${option.id}`} className={styles.quizItemsRightItemsOptionsListItemText}>{option['text']}</label>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </>
                                                })}
                                                <div className={styles.quizItemsRightItemsButtons}>
                                                    <div className={styles.quizItemsRightItemsButtonsBack + ' ' + styles.quizItemsRightItemsButtonsButton}>
                                                        <div className={styles.quizItemsRightItemsButtonsButtonIcon}>
                                                            <img src="/assets/icons/arrow-left.svg" alt="" />
                                                        </div>
                                                        <div className={styles.quizItemsRightItemsButtonsButtonText}>Назад</div>
                                                    </div>
                                                    <div
                                                        className={
                                                            `${styles.quizItemsRightItemsButtonsNext} ${styles.quizItemsRightItemsButtonsButton}`
                                                        }
                                                        onClick={
                                                            () => {
                                                                setTimeout(() => {
                                                                    answer < (quiz.answers.length) && setAnswer(prev => prev + 1);
                                                                    answer <= (quiz.answers.length) & progress < 1 && setProgress(prev => prev + (1 / quiz.answers.length));
                                                                    answer == (quiz.answers.length) && setFinish(true);
                                                                }, 100);
                                                            }
                                                        } // (progress * 100).toFixed(2)
                                                    >
                                                        <input type="submit"/>
                                                        <div className={styles.quizItemsRightItemsButtonsButtonText}>Вперёд</div>
                                                        <div className={styles.quizItemsRightItemsButtonsButtonIcon}>
                                                            <img src="/assets/icons/arrow-right.svg" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className={styles.quizItemsRightItemsFinish}>
                                                    <div className={styles.quizItemsRightItemsFinishText}>
                                                        <div className={styles.quizItemsRightItemsFinishTextTitle}>Тест закончен</div>
                                                        <div className={styles.quizItemsRightItemsFinishTextDesc}>Ознакомиться с результатами можно ниже</div>
                                                    </div>
                                                    <div className={styles.quizItemsRightItemsFinishAnswers}>
                                                        {quiz.answers.map((quizItem, index) => {
                                                            return <>
                                                                <div className={styles.quizItemsRightItemsFinishAnswersItem}>
                                                                    <div className={styles.quizItemsRightItemsFinishAnswersItemHeader}>
                                                                        <div className={styles.quizItemsRightItemsFinishAnswersItemHeaderTitle}><span>#{index + 1}</span>{quizItem.text}</div>
                                                                        <div className={styles.quizItemsRightItemsFinishAnswersItemHeaderStatus + ' ' + (history[index] && (history[index].answer == getCorrectlyAnswers()[index].text ? styles.answerTrue : styles.answerFalse))}>{history[index] && (history[index].answer == getCorrectlyAnswers()[index].text ? 'Верно' : 'Неверно')}</div>
                                                                    </div>
                                                                    <div className={styles.quizItemsRightItemsFinishAnswersItemBody}>
                                                                        <div className={styles.quizItemsRightItemsFinishAnswersItemBodyItems}>
                                                                            {quizItem.options.map((answerOption, indexOption) => {
                                                                                return <>
                                                                                    <div className={styles.quizItemsRightItemsFinishAnswersItemBodyItemsItem}>
                                                                                        <div className={styles.quizItemsRightItemsFinishAnswersItemBodyItemsItemText}>Вариант {indexOption + 1}</div>
                                                                                        <div className={styles.quizItemsRightItemsFinishAnswersItemBodyItemsItemValue + ' ' + (answerOption.correctly ? styles.optionTrue : (history[index].answer == answerOption.text ? styles.optionCheck : styles.optionFalse))}>{answerOption.text} {answerOption.correctly ? '(Верный)' : (history[index].answer == answerOption.text && '(Ваш)')}</div>
                                                                                    </div>
                                                                                </>
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        })}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>Тест закончен</div>
                                                    <div>
                                                        {/* {console.log(history)} */}
                                                        {quiz.answers.map((quizItem, index) => {
                                                            console.log(getCorrectlyAnswers()[index].correctly);
                                                            // {quizItem.options.map((optionItem) => {
                                                            //     // console.log(optionItem);
                                                            //     return <div key={quizItem.id}>{quizItem.text} | {history[index] && history[index].answer}</div>
                                                            // })}
                                                            return <div key={quizItem.id}>{quizItem.text} | {history[index] && history[index].answer} | {history[index] && (history[index].answer == getCorrectlyAnswers()[index].text ? 'Верно' : 'Неверно')}</div>
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {/* {quiz.answers.map(answerItem => {
                                            return (answerItem.id == answer) &&
                                            <>
                                                <div className={styles.quizItemsRightItemsText}>
                                                    <div className={styles.quizItemsRightItemsTextItems}>
                                                        <div className={styles.quizItemsRightItemsTextItemsTitle}>{answerItem['text']}</div>
                                                        <div className={styles.quizItemsRightItemsTextItemsDesc}>Выберите один из вариантов ответа</div>
                                                    </div>
                                                </div>
                                                <div className={styles.quizItemsRightItemsOptions}>
                                                    <div className={styles.quizItemsRightItemsOptionsList}>
                                                        {answerItem['options'].map(option => {
                                                            return (
                                                                <>
                                                                    <div className={styles.quizItemsRightItemsOptionsListItem} key={option['text']}>
                                                                        <input id={`answer${option.id}`} type="radio" defaultValue={option['text']} {...register(`answer`)} />
                                                                        <label htmlFor={`answer${option.id}`} className={styles.quizItemsRightItemsOptionsListItemText}>{option['text']}</label>
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                        })}
                                        <div className={styles.quizItemsRightItemsButtons}>
                                            <div className={styles.quizItemsRightItemsButtonsBack + ' ' + styles.quizItemsRightItemsButtonsButton}>
                                                <div className={styles.quizItemsRightItemsButtonsButtonIcon}>
                                                    <img src="/assets/icons/arrow-left.svg" alt="" />
                                                </div>
                                                <div className={styles.quizItemsRightItemsButtonsButtonText}>Назад</div>
                                            </div>
                                            <div
                                                className={
                                                    `${styles.quizItemsRightItemsButtonsNext} ${styles.quizItemsRightItemsButtonsButton}`
                                                }
                                                onClick={
                                                    () => {
                                                        answer < (quiz.answers.length) && setAnswer(prev => prev + 1);
                                                        answer <= (quiz.answers.length) & progress < 1 && setProgress(prev => prev + (1 / quiz.answers.length));
                                                        answer == (quiz.answers.length) && setFinish(true);
                                                    }
                                                }
                                            >
                                                <input type="submit"/>
                                                <div className={styles.quizItemsRightItemsButtonsButtonText}>Вперёд</div>
                                                <div className={styles.quizItemsRightItemsButtonsButtonIcon}>
                                                    <img src="/assets/icons/arrow-right.svg" alt="" />
                                                </div>
                                            </div>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                :
                    <div className={styles.quizItems}>Загрузка...</div>
                }
            </div>
        </>
    );
};

export default QuizCard;