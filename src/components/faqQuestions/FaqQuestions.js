import React from 'react';
import { questions } from '../questions';
import { Accordion, AccordionItem } from 'react-sanfona';
import AskQuestion from '../AskQuestion';
import './faq.scss';

const FaqQuestions = () => {
    return (
        <section id="faq-quests">
            <div className="container">
                <h2>Вопрос-ответ:</h2>
                <Accordion className="faq-accordion">
                    {
                        questions.map((item, index) => {
                            return <AccordionItem className="faq-accordion-item" expanded={index === 1} title={item.title} key={index}>
                                <div className="answer" dangerouslySetInnerHTML={{__html: item.answer}}></div>
                            </AccordionItem>
                        })
                    }
                </Accordion>
            </div>
            <AskQuestion />
        </section>
    );
}

export default FaqQuestions;