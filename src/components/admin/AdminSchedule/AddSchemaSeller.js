import React from 'react';
import s from './styles.module.scss';
function AddSchemaSeller(props) {
    const onClick = () => {
        props.clickHandler({
            ...props.seller,
            inQueue: props.seller.inQueue === 1 ? 0 : 1
        });
    }
    return (
        <div className={props.seller.inQueue ? `${s.addSchemaSeller} ${s.addSchemaSeller__success}` : s.addSchemaSeller}>
            <p>{props.seller.name}</p>
            <button className={props.seller.inQueue ? "btn btn-danger" : "btn btn-success"} onClick={onClick}>
                {props.seller.inQueue ? "Убрать из очереди" : "Добавить в очередь"}
            </button>
        </div>
    )
}

export default AddSchemaSeller;