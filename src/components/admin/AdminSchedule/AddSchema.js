import React, { useState } from 'react';
import s from './styles.module.scss';
import transitions from './transitions.module.scss';
import { CSSTransition } from 'react-transition-group';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import AddSchemaSeller from './AddSchemaSeller';
import axios from 'axios';
import Picker from './Picker';

function AddSchema (props) {
    const [name, setName] = useState(props.activeEvent ? props.activeEvent.title : "");
    const [startDate, setStartDate] = useState(props.activeEvent ? new Date(props.activeEvent.start) : new Date());
    const [endDate, setEndDate] = useState(props.activeEvent ? new Date(props.activeEvent.end) : new Date());
    const [sellers, setSellers] = useState([]);
    const [schema, setSchema] = useState(props.activeEvent ? props.activeEvent.schema : []);
    if (!sellers.length) {
        let token = sessionStorage.getItem('gc-token') || localStorage.getItem('gc-token') || null;
        axios.get('/api/sellers', {headers: { Authorization: `Bearer ${token}` }})
            .then(res => res.data)
            .then(data => !data.error && setSellers(data.sellers.filter(seller => seller.isJunior === 0)))
            .catch(err => console.log(err));
    }
    if (sellers.length && !schema.length) {
        if (props.activeEvent) {
            setSchema(props.activeEvent.schema);
        }
        else {
            let initSchema = sellers.map(seller => {return {...seller}});
            setSchema(initSchema);
        }
    }

    const changeSchema = (newSeller) => {
        let newSchema = schema.map(seller => seller.id === newSeller.id ? newSeller : seller);
        setSchema(newSchema);
    }
    
    const newAddedSchema = {
        title: name,
        start: startDate,
        end: endDate,
        schema: schema,
    }
    if (props.activeEvent) newAddedSchema.id = props.activeEvent.id;

    const onClickBtn = () => {
        props.addEvent(newAddedSchema);
        setName("");
        setSchema([]);
    }
    const onUpdateClick = () => {
        props.updateEvent(newAddedSchema);
        setName("");
        setSchema([]);
    }
    const changeStartDate = (date) => setStartDate(new Date(date));
    const changeEndDate = (date) => setEndDate(new Date(date));
    return (
        <CSSTransition
            in={props.in}
            classNames={transitions}
            timeout={400}
            unmountOnExit
        >
            <div className={s.popupWrap}>
                <div className={s.popup}>
                    <button className={s.popup__close} onClick={props.closeHandler}><IoMdCloseCircleOutline/></button>
                    <h3>{props.activeEvent ? name : 'Добавьте новый шаблон'}</h3>
                    <input 
                        type="text" 
                        onChange={e => setName(e.target.value)} 
                        placeholder="Имя шаблона" 
                        value={name}
                    />
                    <div className={s.addSchema__sellers}>
                        {
                            schema.map((seller, index) => {
                                return <AddSchemaSeller seller={seller} clickHandler={changeSchema} key={index}/> 
                            })
                        }
                    </div>
                    <div>
                        <div className={s.addSchema__dateGroup}>
                            <span>Дата и время начала</span>
                            <Picker value={startDate} onChange={changeStartDate} />
                        </div>
                        <div className={s.addSchema__dateGroup}>
                            <span>Дата и время окончания</span>
                            <Picker value={endDate} onChange={changeEndDate} />
                        </div>
                    </div>
                    <div className={s.addSchema__btnGroup}>
                        {
                            props.activeEvent == null ?
                                <button className="btn btn-success" onClick={onClickBtn}>Добавить шаблон</button> :
                                <button className="btn btn-success" onClick={onUpdateClick}>Изменить шаблон</button>
                        }
                        
                        {
                            props.activeEvent !== null && 
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => props.deleteEvent(props.activeEvent)}
                                >Удалить шаблон</button>
                        }
                    </div>
                </div>
            </div>
        </CSSTransition> 
    );
}

export default AddSchema;