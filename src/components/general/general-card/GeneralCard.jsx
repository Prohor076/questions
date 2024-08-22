// import { QuizContext } from '../../../providers/QuizProvider';
import { Link } from 'react-router-dom';
import styles from './GeneralCard.module.css';
import { useContext, useState } from "react";

const GeneralCard = ({ quiz, children }) => {
    const difficulties = {
        low: 'Легко',
        medium: 'Средне',
        high: 'Сложно',
    };
    
    return (
        <Link to={`/quiz/${quiz.id}`} className={styles.cardLink}>
            <div className={styles.card}>
                <div className={styles.cardItems}>
                    <div className={styles.cardItemsHeader}>
                        <div className={styles.cardItemsHeaderItems}>
                            <div className={styles.cardItemsHeaderItemsName}>{quiz.name}</div>
                            <div className={styles.cardItemsHeaderItemsDifficulty + ' ' + styles[quiz.difficulty]}>
                                {
                                    difficulties[quiz.difficulty]
                                    ? difficulties[quiz.difficulty]
                                    : 'Ошибка'
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.cardItemsBody}>
                        <div className={styles.cardItemsBodyList}>
                            <div className={styles.cardItemsBodyListItem}>
                                <div className={styles.cardItemsBodyListItemIcon}><img src="/assets/icons/clock2.svg" alt="" /></div>
                                <div className={styles.cardItemsBodyListItemText}>
                                    <div className={styles.cardItemsBodyListItemTextDesc}>Ограничение</div>
                                    <div className={styles.cardItemsBodyListItemTextValue}>{quiz.time} минут</div>
                                </div>
                            </div>
                            <div className={styles.cardItemsBodyListItem}>
                                <div className={styles.cardItemsBodyListItemIcon}><img src="/assets/icons/comment.svg" alt="" /></div>
                                <div className={styles.cardItemsBodyListItemText}>
                                    <div className={styles.cardItemsBodyListItemTextDesc}>Вопросы</div>
                                    <div className={styles.cardItemsBodyListItemTextValue}>{quiz.answers.length} шт.</div>
                                </div>
                            </div>
                            {/* <div className={styles.cardItemsBodyListItem}>
                                <div className={styles.cardItemsBodyListItemIcon}><img src="/assets/icons/clipboard.svg" alt="" /></div>
                                <div className={styles.cardItemsBodyListItemText}>
                                    <div className={styles.cardItemsBodyListItemTextDesc}>Расширить и углубить правовые знания, ответив на ряд вопросов, которые касаются Конституции.</div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GeneralCard;