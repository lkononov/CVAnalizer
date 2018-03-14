import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

export default class Candidates extends React.Component {
    static isPrivate = true;
    constructor(props) {
        super(props);
        this.state = {
            Candidates: [],
        }
    }
    

    componentWillMount() {
        const cookies = new Cookies();
        const token = cookies.get('ID');
        
        //const axiosInstance = axios.create({
        //    baseURL: process.env.REACT_APP_BACKEND_HOST,
        //    headers: { Authorization: `Bearer ${this.$store.state.token}` },
        //});
        const url = `/Api/GetCandidates`;
        const params = { name };
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        axios.post(url, params, config)
             .then((res) => {
                console.log(res)
                this.setState({ Candidates: res.data })
                console.log(this.state.Candidates)
            }).catch((err) => {
                console.log(err)
            });
        
        //console.log('ID');

        //axios.post('/Api/GetCandidates', {
        //    headers: {
        //        'Authorization': `Bearer ${this.state.tokin}`
        //    }
        //})
        //    .then((res) => {
        //        console.log(res)
        //        this.setState({ Candidates: res.data })
        //        console.log(this.state.Candidates)
        //    }).catch((err) => {
        //        console.log(err)
        //    });
    }

    render() {
        return (
            <div>
            </div>
        );
    }
};