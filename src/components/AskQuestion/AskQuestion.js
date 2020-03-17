import React from 'react';
import AskQuestionForm from './AskQuestionForm';
import './askQuestion.scss';

const AskQuestion = () => {
    return (
        <section id="ask">
            <div className="container">
                <h2 className="title">Задайте свой вопрос</h2>
                <p className="subtitle">Не нашли ответа на интересующий Вас вопрос? Задайте его нашему специалисту</p>
                <AskQuestionForm />
            </div>
        </section>
    );
}

export default AskQuestion;