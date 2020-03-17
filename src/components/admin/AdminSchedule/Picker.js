import React from 'react';
import { DateTimePicker } from 'react-widgets';
import momentLocalizer from 'react-widgets-moment';
import moment from 'moment';
import 'moment/locale/ru';
import 'react-widgets/lib/scss/react-widgets.scss';

function Picker (props) {
    moment.locale('ru');
    momentLocalizer(moment);
    return (
        <div className="picker">
            <DateTimePicker 
                defaultValue={props.value || new Date()} 
                onChange={props.onChange}
                
            />
        </div>
    );
}

export default Picker;