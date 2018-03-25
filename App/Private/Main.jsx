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

    componentWillMount() {
        const cookies = new Cookies();
        const token = cookies.get('ID');
        const params = { tname: "Java"}
        const url = `/Api/GetCandidates`;     
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body : {
                tname: "Java"
            }
        };

        axios.post(url, params, config)
            .then((res) => {
                console.log(res)
                this.setState({ Candidates: res.data })
                console.log(this.state.Candidates)
            }).catch((err) => {
                console.log(err)
                cookies.remove('ID')
            });
    }

    render() {
        if (this.state.Candidates.length !== 0) {
            var cc = this.state.Candidates;

            var filteredCandidates = [];


            for (var i = 0; i < cc.length; i++) {

                if (filteredCandidates.filter(c => c.uid === cc[i].uid).length === 0) {
                    var cs = cc.filter(function (c) {
                        if (c.uid === cc[i].uid) {
                            return true;
                        }
                        return false;
                    });

                    var nc = {
                        uid: cs[0].uid,
                        name: cs[0].uName,
                        sname: cs[0].suName,
                        tech: cs.map(function (c) {
                            var tc = { tname: c.tName, exp: c.exp };
                            return tc;
                        })
                    };

                    filteredCandidates.push(nc);
                }

            }

            console.log(filteredCandidates);
        }
        

        return (
            <div className="container-fluid">
                <Navbar />                          
                <Candidates candidates={this.state.Candidates} />
                {}
            </div>
        );
    }
};