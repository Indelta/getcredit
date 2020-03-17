import React from 'react';
import AdminChangeSellerData from './AdminChangeSellerData';

function AdminSeller ({item, updateSellerData, deleteSeller}) {
    let {id, name, inQueue, isJunior} = item;
    const handleClickQueue = () => updateSellerData({...item, inQueue: !inQueue});
    const handleClickDelete = () => deleteSeller(id);
    const handleClickJunior = () => updateSellerData({...item, isJunior: !isJunior});
    return (
        <div className={inQueue ? "seller-item inQueue" : "seller-item"}>
            <div className="left">
                <h3>{name}</h3>
                <AdminChangeSellerData item={item} updateSellersList={updateSellerData} />
            </div>
            <div className="right">
                <div className="btn-group">
                    <button 
                        className={`btn ${inQueue ? 'btn-danger' : 'btn-success'}`}
                        onClick={handleClickQueue}
                    >{inQueue ? "Убрать из очереди" : "Добавить в очередь"}</button>
                    <button className="btn btn-danger" onClick={handleClickDelete}>Уволить</button>
                </div>
                <div className="btn-group">
                    <button
                        className={`btn ${!isJunior && "btn-default" }`}
                        onClick={handleClickJunior}
                    >
                        {isJunior ? "Перевести в основной состав" : "Перевести в новички"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminSeller;