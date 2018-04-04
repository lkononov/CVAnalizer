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
            FilteredApplicants: [], 
            FilteredApplicantsSearchConst: [],
            FilteredApplicantsBySearch: [],
            Technologies: [],
            SortedTechnoligies: [],
            SelectedTechnologies: [],
                    
        }
    }

    //Applicant get from db
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

                this.setState({ FilteredApplicantsSearchConst: this.FilterApplicants() });

            }).catch((err) => {
                console.log(err)
                cookies.remove('ID')
            });
        //Get Technologies
        this.SearchTechnologies();        
    }

    //Applicants show filter
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
                            var tc = { tname: c.tName, exp: c.exp, tid: c.tId };
                            return tc; 
                        })
                    };

                    filteredCandidates.push(nc);
                }

            }
            return filteredCandidates;           
        }       
    }

    //Technologies search ready
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

    //Get Technologies from db
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

    //Select Applicants by search
    onChange = (value) => {
        console.log(this.state.FilteredApplicantsSearchConst);
        var fa = this.state.FilteredApplicantsSearchConst;
        var SelectedApplicants = [];

        if (value.length != 0) {
            for (var j = 0; j < fa.length; j++) {
                for (var i = 0; i < value.length; i++) {
                    if (fa[j].tech.some(it => it.tid === value[i].value)) {
                        if (SelectedApplicants.some(user => user.uid === fa[j].uid))
                        {
                            console.log("alredy exist");
                        }
                        else
                        {
                            SelectedApplicants.push(fa[j])
                        }
                    }
                }
            }
            this.setState({ FilteredApplicants: SelectedApplicants })
            console.log(this.state.FilteredApplicants)
        }
        else {
            this.setState({ FilteredApplicants: fa })
        }
    }   
    //Candidate Click Handler => open full info
    ClickHandler = (UserUid) => {
        if (UserUid.length != 0)
        {
            var FindUser = this.state.FilteredApplicantsSearchConst;
            var GetIt = FindUser.find(user => user.uid === parseInt(UserUid));
        }
         var current_applicants = this.state.applicants;
    }
    //Render
    render() {      
        return (
            <div className="container-fluid">
                <Navbar />
                <div className="container">
                
                    <br/>
                    <div className="row">
                        <div className="col-md-8">
                            <Candidates onClick={this.ClickHandler.bind(this)} applicants={this.state.FilteredApplicants} />
                        </div>
                        <div className="col-md-4 soup white">
                            <br />
                            <SearchStack onChange={this.onChange.bind(this)} technologies={this.state.SortedTechnoligies} />
                        </div>
                    </div>              
                </div>
            </div>
        );
    }
};