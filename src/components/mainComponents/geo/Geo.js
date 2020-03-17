import React, { useState, useEffect } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { connect } from 'react-redux';
import styles from './geo.module.scss';
import axios from 'axios';

function Geo () {
    const [loading, setLoading] = useState(true);
    const [geoData, setGeoData] = useState({});
    if (!Object.keys(geoData).length) {
        axios.get('https://api.sypexgeo.net/json/')
            .then(response => response.data)
            .then(data => {
                setLoading(false);
                setGeoData(data.city);
            });
    }
    
    return (
        <div className={styles.geoLocation}>
            {
                !loading && geoData && geoData.name_ru && geoData.name_ru.length && 
                    <p className={styles.p}>
                        <MdLocationOn className={styles.geoIcon} />
                        Ваш город: <span>{geoData.name_ru}</span>
                    </p>
                }
        </div>
    )
}

export default connect(state => ({store: state.geoReducer}))(Geo);