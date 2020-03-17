import React, {useState} from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import {connect} from 'react-redux';
import axios from 'axios';

const Phone = (props) => {
    const [phoneStr, setPhoneStr] = useState("");
    const [cityCode, setCityCode] = useState("");
    const [phoneCode, setPhoneCode] = useState("");
    const [part1, setPart1] = useState("");
    const [part2, setPart2] = useState("");
    const [part3, setPart3] = useState("");
    if (!phoneStr && +props.utms.location >= 0) {
        axios.get(`/api/sellers/ready-seller/?location=${props.utms.location}`)
        .then(res => res.data)
        .then(data => {
            let phone = data.phone ? `tel:+${data.phone.toString()}` : "tel:+375297728772";
            setPhoneStr(phone);
            let mainStr = data.phone ? data.phone.toString() : "375297728772";
            setCityCode(mainStr.slice(0, 3));
            setPhoneCode(mainStr.slice(3, 5));
            setPart1(mainStr.slice(5, 8));
            setPart2(mainStr.slice(8, 10));
            setPart3(mainStr.slice(10));
        })
        .catch(err => console.error(err));
    }
    return (
        <a href={phoneStr} className="tel-num">        
            <FiPhoneCall/>
            <div>+{cityCode} ({phoneCode}) {part1}-{part2}-{part3}</div>
        </a>
    );
}

export default connect(
    state => ({utms: state.utmsReducer})
)(Phone);