import React, {useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import { IoMdCloseCircleOutline } from 'react-icons/io';

function AdminChangeSellerData ({item, updateSellersList}) {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState(item.name);
    const [bitrix_id, setBitrix_id] = useState((item.bitrix_id * 1));
    const [inQueue, setInQueue] = useState(item.inQueue);
    const [phone, setPhone] = useState(item.phone);
    const [error, setError] = useState(false);

    const changeData = () => {
        if (!name.length || !bitrix_id || !phone.length) {
            setError(true);
        }
        else {
            setError(false);
            let updatedSeller = {
                ...item,
                name,
                bitrix_id,
                inQueue,
                phone
            }
            updateSellersList(updatedSeller);
            setIsVisible(false);
        }
    }
    return (
        <div className="changeSellerData">
            <button className="btn btn-default" onClick={() => setIsVisible(true)}>Изменить личные данные</button>
            <CSSTransition
                in={isVisible}
                timeout={400}
                classNames="change"
                unmountOnExit
            >
                <div className="popup-wrap">
                    <div className="popup">
                    <button className="close" onClick={() => setIsVisible(false)}><IoMdCloseCircleOutline /></button>
                        <h3>Изменить личные данные сотрудника</h3>
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
                        <button className="btn btn-block" onClick={changeData}>Изменить данные</button>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
} 

export default AdminChangeSellerData;