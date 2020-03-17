import React from 'react';
import Scale from './Scale';
import FinalForm from './FinalForm';

const FinalStep = (props) => {
    
    const checkRating = () => {
        let rating = 100;
        const summa = props.calcStore.summa;
        const maternityLeave = props.calcStore.maternityLeave;
        const experience = props.calcStore.experience;
        const latePayments = props.calcStore.latePayments;
        if (summa < 1000) rating -= 20;
        if (maternityLeave === "Да") rating -= 20;
        if (experience === "0-3 месяца") rating -= 20;
        if (latePayments === "Да") rating -= 20;
        if (rating > 0 && rating <= 40) return 'low';
        if (rating > 40 && rating <= 70) return 'mid';
        if (rating > 70) return 'high';
    }
    
    return (
       <div className="calc-step final-step">
           <div className="left">
               <div className="header">
                   <div className="left">
                       <h2>Поздравляем!</h2>
                   </div>
                   <div className="right">
                       <p>Вы запросили сумму:</p>
                       <p><span>{props.calcStore.summa} BYN</span></p>
                   </div>
               </div>
               <div className="post-header">
                    <p>
                        Вероятность получения кредита: {
                            
                            checkRating() === 'low' ? <span>низкая</span> :
                            checkRating() === 'mid' ? <span>средняя</span> :
                            <span>высокая</span>
                        }
                    </p>
               </div>
               <Scale rating={checkRating()} />
               <div className="post-header">
                    <p>
                        Подобрано специальных предложений от банков: {
                            checkRating() === 'low' ? <span>1</span> :
                            checkRating() === 'mid' ? <span>5</span> :
                            <span>12</span>
                        }
                    </p>
               </div>
           </div>
           <div className="right"><FinalForm calcStore={props.calcStore} resetState={props.resetState} calcName={props.calcName} /></div>
       </div> 
    );
}

export default FinalStep;