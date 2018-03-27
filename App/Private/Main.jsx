import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { debounce } from 'throttle-debounce';
import Navbar from '../header/header.jsx';
import Projects from './Projects.jsx';
import Candidates from './Candidates.jsx';
import SearchStack from '../Components/SearchStack.jsx';

export default class Main extends React.Component {
    static isPrivate = true;
    constructor(props) {
        super(props);
        this.state = {
            Candidates: [],
            Technologies: [],
            SortedTechnoligies: [],
            FilteredApplicants: [],         
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
           
                this.setState({ Candidates: res.data })
               
                this.setState({ FilteredApplicants: this.FilterApplicants() });

            }).catch((err) => {
                console.log(err)
                cookies.remove('ID')
            });

        this.SearchTechnologies();
     
    }

    FilterApplicants() {
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
            return filteredCandidates;           
        }       
    }

    sortTechnologiesForSelect() {
        if (this.state.Technologies.length !== 0) {
            var st = this.state.Technologies;

            var filterTechnologies = [];    
            for (var i = 0; i < st.length; i++) {

                var ss = {
                    label: st[i].name,
                    value: st[i].tid
                };
                filterTechnologies.push(ss);
            }

            return filterTechnologies;
        }
    }

    SearchTechnologies() {
        
        const cookies = new Cookies();
        const token = cookies.get('ID');
        const params = { params: "ok"}
        const url = `/Api/GetTechnologies`;
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        };

        axios.post(url, params, config)
            .then((res) => {
               this.setState({ Technologies: res.data })
               this.setState({ SortedTechnoligies: this.sortTechnologiesForSelect() })
               
            }).catch((err) => {
                console.log(err)
                cookies.remove('ID')
            });
    }

    render() {    
        
        return (
            <div className="container-fluid">
                <Navbar />
                <div className="container">
                
                    <br/>
                    <div className="row">
                        <div className="col-md-8">
                            <Candidates applicants={this.state.FilteredApplicants}/>
                        </div>
                        <div className="col-md-4 white">
                            <br />
                            <SearchStack technologies={this.state.SortedTechnoligies} />
                        </div>
                    </div>              
                </div>
            </div>
        );
    }
};