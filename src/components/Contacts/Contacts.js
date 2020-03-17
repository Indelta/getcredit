import React, {useState, useEffect} from 'react';
import Tabs from './Tabs';
import { connect } from 'react-redux';
import MinskContacts from './MinskContacts';
import MogilevContacts from './MogilevContacs';
import MinskPhotos from './MinskPhotos';
import MogilevPhotos from './MogilevPhotos';
import Map from '../mainComponents/map';
import './contacts.scss';

const Contacts = (props) => {
    const [activeTab, setActiveTab] = useState(0);
    const clickTabHandler = (e) => {
        let active = Number(e.target.getAttribute('location'));
        setActiveTab(active);
    }
    useEffect(() => {
        setActiveTab(props.location);
    }, [props.location]);
    return (
        <>
        <div className="container">
            <h2>Контакты</h2>
            <div className="contacts-data">
                <h3 className="bordered-title">Единый кредитный центр <span>GetCredit.by</span></h3>
                <Tabs active={activeTab} clickTabHandler={clickTabHandler} />
                { !activeTab ? <MinskContacts /> : <MogilevContacts /> }
                { !activeTab ? <MinskPhotos /> : <MogilevPhotos /> }
            </div>
        </div>
        <Map withoutHeader={true} activeMap={activeTab} />
        </>
    );
}

export default connect(
    state => ({location: state.utmsReducer.location})
)(Contacts);