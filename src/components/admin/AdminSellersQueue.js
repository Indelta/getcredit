import React, {Component} from 'react';
import axios from 'axios';
import AdminSellersList from './AdminSellersList';
import AdminAddNewSeller from './AdminAddNewSeller';


class AdminSellersQueue extends Component {
    constructor(props) {
        super(props);
        this.token = sessionStorage.getItem('gc-token') || localStorage.getItem('gc-token');
        this.headers = { Authorization: `Bearer ${this.token}` };
        this.state = {
            sellersList: [],
            filial: 0
        }
        this.updateSellerData = this.updateSellerData.bind(this);
        this.deleteSeller = this.deleteSeller.bind(this);
        this.addNewSeller = this.addNewSeller.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const filial = nextProps.match.params.filial;
        if (filial !== prevState.filial) return {filial};
        return null;
    }

    componentDidMount() {
        axios.get('/api/sellers', {headers: this.headers})
            .then(response => response.data)
            .then(data => {
                if (!data.error && data.message === "success") this.setState({sellersList: data.sellers});
                else console.error(data.message);
            });
    }

    addNewSeller(newSeller, callback) {
        axios.post('/api/sellers', {...newSeller, filial: this.state.filial}, {headers: this.headers})
            .then(response => response.data)
            .then(data => {
                if (!data.error && data.message === "success") {
                    this.setState({sellersList: [...this.state.sellersList, {...newSeller, filial: this.state.filial}]});
                    callback();
                }
                else console.error(data.message);
            });
    }

    updateSellerData (newSeller) {
        const { sellersList } = this.state;
        let newSellersList = sellersList.map(seller => {
            return seller.id === newSeller.id ? newSeller : seller; 
        });
        axios.put('/api/sellers', newSeller, {headers: this.headers})
            .then(response => response.data)
            .then(data => {
                if (!data.error && data.message === "success") this.setState({sellersList: newSellersList});
                else console.error(data.message);
            });
    }

    deleteSeller (id) {
        const {sellersList} = this.state;
        let newSellersList = sellersList.filter(seller => id !== seller.id);
        axios.delete('/api/sellers', {data: {id}, headers: this.headers})
            .then(response => response.data)
            .then(data => {
                if (!data.error && data.message === "success") this.setState({sellersList: newSellersList});
                else console.error(data.message);
            });
    }

    render() {
        let sellersList = this.state.sellersList.filter(seller => +seller.filial === +this.state.filial);
        return (
            <section className="adminSellersQueue">
                <h2>Очередь получения заявок</h2>
                <p>Используется только тогда, когда в расписании на дату заявки нет активного шаблона</p>
                <AdminSellersList
                    sellersList={sellersList}
                    updateSellerData={this.updateSellerData}
                    deleteSeller={this.deleteSeller}
                />
                <AdminAddNewSeller handlerClick={this.addNewSeller} />
            </section>
        );
    }
    
}

export default AdminSellersQueue;