import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Navbar from '../header/header.jsx';
import Projects from './Projects.jsx';
import Candidates from './Candidates.jsx';

export default class Main extends React.Component {
    static isPrivate = true;
    constructor(props) {
        super(props);
        this.state = {
            Candidates: [],
        }
    }

    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('ID');

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
    }

    render() {
        return (
            <div className="container-fluid">
                <Navbar />                          
                <Candidates candidates={this.state.Candidates} />
            
            </div>
        );
    }
};