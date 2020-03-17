import React, { Component } from 'react';
import AddSchema from './AddSchema';
import s from './styles.module.scss';
import EventsList from './EventsList';
import axios from 'axios';

class AdminSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false,
            sellers: [],
            events: [],
            activeEvent: null
        }
        this.closeHandler = this.closeHandler.bind(this);
        this.openHandler = this.openHandler.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.selectEvent = this.selectEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);

        this.token = sessionStorage.getItem('gc-token') || localStorage.getItem('gc-token') || null;
    }
    componentDidMount() {
        axios.get('/api/schemas', {headers: {Authorization: `Bearer ${this.token}`}})
            .then(res => res.data)
            .then(data => {
                if (data.message && data.message.length) {
                    let events = data.message.map(schema => {
                        return {
                            id: schema.id,
                            title: schema.name,
                            start: new Date(schema.periodStart),
                            end: new Date(schema.periodEnd),
                            schema: JSON.parse(schema.queueSchema).schema
                        }
                    });
                    this.setState({ events });
                }
            })
            .catch(err => console.log(err));
    }
    
    closeHandler() {
        this.setState({openPopup: false, activeEvent: null});
    }
    openHandler() {
        this.setState({openPopup: true});
    }

    addEvent(e) {
        axios.post('/api/schemas', {event: e}, {headers: {Authorization: `Bearer ${this.token}`}})
            .then(res => res.data)
            .then(data => {
                if(!data.error) {
                    let newEvents = data.message.map(event => {
                        return {
                            id: event.id,
                            title: event.name,
                            start: new Date(event.periodStart),
                            end: new Date(event.periodEnd),
                            schema: JSON.parse(event.queueSchema).schema,
                        }
                    });
                    this.setState({events: newEvents, openPopup: false});
                }
            })
            .catch(err => console.log(err));
    }
    selectEvent(e) {
        this.setState({
            openPopup: true,
            activeEvent: e
        })
    }
    updateEvent(e) {
        axios.put('/api/schemas', {event: e}, {headers: {Authorization: `Bearer ${this.token}`}})
            .then(res => res.data)
            .then(data => {
                if(!data.error) {
                    if (data.message && data.message.length) {
                        let events = data.message.map(schema => {
                            return {
                                id: schema.id,
                                title: schema.name,
                                start: new Date(schema.periodStart),
                                end: new Date(schema.periodEnd),
                                schema: JSON.parse(schema.queueSchema).schema,
                                allDay: schema.allDay ? true : false
                            }
                        });
                        this.setState({ events, openPopup: false });
                    }
                }
            })
            .catch(err => console.log(err));
    }
    deleteEvent(e) {
        axios.delete('/api/schemas', {
            data: {event: e},
            headers: {Authorization: `Bearer ${this.token}`}
        })
            .then(res => res.data)
            .then(data => {
                if(!data.error) {
                    if (data.message) {
                        let events = data.message.map(schema => {
                            return {
                                id: schema.id,
                                title: schema.name,
                                start: new Date(schema.periodStart),
                                end: new Date(schema.periodEnd),
                                schema: JSON.parse(schema.queueSchema).schema
                            }
                        });
                        this.setState({ events, openPopup: false });
                    }
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <section className={s.schedule}>
                <h2>Расписание и шаблоны</h2>
                <EventsList events={this.state.events} selectEvent={this.selectEvent} />
                <button onClick={this.openHandler} className="btn">Добавить новый шаблон</button>
                {
                    this.state.openPopup &&
                    <AddSchema 
                        in={this.state.openPopup} 
                        closeHandler={this.closeHandler} 
                        activeEvent={this.state.activeEvent}
                        addEvent={this.addEvent}
                        updateEvent={this.updateEvent}
                        deleteEvent={this.deleteEvent}
                    />
                }
                
            </section>
        );
    }
}

export default AdminSchedule;