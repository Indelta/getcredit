import React, {useState} from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { CSSTransition } from 'react-transition-group';

function AdminAddNewSeller (props) {
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const [bitrix_id, setBitrix_id] = useState('');
    const [phone, setPhone] = useState('');
    const [inQueue, setInQueue] = useState(false);

    const addNewSeller = () => {
        const successFunc = () => {
            setError(false);
            setName('');
            setBitrix_id('');
            setPhone('');
            setIsVisible(false);
        }
        if (!name || !bitrix_id || !phone) setError(true);
        else {
            
            const newSeller = {name, bitrix_id, phone, inQueue};
            props.handlerClick(newSeller, successFunc);
        }
    }
    return (
        <div className="addNewSeller">
            <button className="btn" onClick={() => setIsVisible(true)}>Добавить нового сотрудника</button>
            <CSSTransition
                in={isVisible}
                timeout={400}
                classNames="seller-add"
                unmountOnExit
            >
                <div className="popup-wrap">
                    <div className="popup">
                        <button className="close" onClick={() => setIsVisible(false)}><IoMdCloseCircleOutline /></button>
                        <h3>Добавить нового сотрудника</h3>
                        <label>
                            <p>Введите имя и фамилию сотрудника</p>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Имя и фамилия" 
                                required 
                                onChange={e => {setName(e.target.value); setError(false)}}
                                value={name}
                            />
                        </label>
                        <label>
                            <p>Введите Bitrix24 ID сотрудника</p>
                            <input 
                                type="number" 
                                name="bitrixId" 
                                required 
                                onChange={e => {setBitrix_id(e.target.value); setError(false)}}
                                value={bitrix_id}
                            />
                        </label>
                        <label>
                            <p>Введите рабочий номер телефона сотрудника</p>
                            <input 
                                type="phone" 
                                name="phone" 
                                placeholder="+375 (**) ***-**-**" 
                                required 
                                onChange={e => {setPhone(e.target.value); setError(false)}}
                                value={phone}
                            />
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                name="inQueue" 
                                onChange={e => setInQueue(e.target.checked)}
                                checked={inQueue}
                            />
                            <span>Добавить в очередь</span>
                        </label>
                        <p className={error ? 'error visible' : 'error'}>Все поля обязательны к заполнению </p>
                        <button className="btn btn-block" onClick={addNewSeller}>Добавить сотрудника</button>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default AdminAddNewSeller;