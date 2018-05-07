import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { debounce } from 'throttle-debounce';
import Navbar from '../header/header.jsx';
import Projects from './Projects.jsx';
import Candidates from './Candidates.jsx';
import SearchStack from '../Components/SearchStack.jsx';
import SearchStackSolo from '../Components/SearchStackSolo.jsx';
import ApplicantProfile from '../Applicant/ApplicantProfile.jsx';


export default class Main extends React.Component {
    static isPrivate = true;
    constructor(props) {
        super(props);
        this.state = {
            Candidates: [],
            FilteredApplicants: [],
            AdittionalFilteredApplicants: [],
            FilteredApplicantsSearchConst: [],
            FilteredApplicantsBySearch: [],
            FullInfoApplicant: [],
            Technologies: [],
            SortedTechnoligies: [],
            SelectedTechnologies: [],
            experience: 0,        
            ShowProfile: false,
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
                        age: cs[0].age,
                        loc: cs[0].location,
                        spec: cs[0].spec,
                        pos: cs[0].pos,
                        tech: cs.map(function (c) {                    
                            var tc = { tname: c.tName, exp: c.exp, tid: c.tId, tg: c.tGroup };
                            return tc; 
                        })
                    };

                    filteredCandidates.push(nc);
                }

            }
            console.log(filteredCandidates)
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
                    value: st[i].tid,
                    tc: st[i].category
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

    //Set experience value onchange
    expOnChange = (value) => {
        if (value != null) {
            this.setState({ experience: value.value })           
        }
        else {          
            this.setState({ experience: 0 })
        }       
    }

    //Select Applicants by search
    onChange = (value) => {
        var fa = this.state.FilteredApplicantsSearchConst;
        var SelectedApplicants = [];
        var AdditionalSelectedApplicants = [];
      
        if (value.length != 0) {        
            console.log(this.state.experience)
            for (var j = 0; j < fa.length; j++) {
                for (var i = 0; i < value.length; i++) {
                    if (fa[j].tech.some(it => it.tid === value[i].value)) {
                        if (SelectedApplicants.some(user => user.uid === fa[j].uid))
                        {
                            console.log("alredy exist");
                        }
                        else
                        {
                            SelectedApplicants.push(fa[j]);
                        }
                    }
                    if (fa[j].tech.some(it => it.tg === value[i].tc && it.exp >= this.state.experience+2)){
                        if (SelectedApplicants.some(user => user.uid === fa[j].uid) || AdditionalSelectedApplicants.some(user => user.uid === fa[j].uid))
                        {
                            console.log("aditional user alredy exist");
                        }
                        else
                        {
                            AdditionalSelectedApplicants.push(fa[j]);                            
                        }
                    }
                }
            }
            this.setState({ FilteredApplicants: SelectedApplicants })
            this.setState({ AdittionalFilteredApplicants: AdditionalSelectedApplicants })
        }
        else
        {
            this.setState({ FilteredApplicants: fa })
            this.setState({ AdittionalFilteredApplicants: AdditionalSelectedApplicants })
        }
    }   

    //Candidate Click Handler => open full info
    ClickHandler = (UserUid) => {

        var GetIt = [];
        var FindUser = this.state.FilteredApplicantsSearchConst;       
        if (UserUid.length != 0)
        {               
            GetIt.push(FindUser.find(user => user.uid === parseInt(UserUid)));
            console.log(GetIt)
            this.setState({ FullInfoApplicant: GetIt }, () => {
                this.setState({ ShowProfile: true })
                console.log(this.state.FullInfoApplicant)
            })           
        }          
    }

    //Handle Applicant profile close
    HandleClose = () => {
        this.setState({ ShowProfile: false});
    }

    //Render IF?() appl prof? || search
    Render() {
        if (this.state.ShowProfile)
        {
            return (
                <ApplicantProfile HandleClose={this.HandleClose} technologies={this.state.SortedTechnoligies} info={this.state.FullInfoApplicant} />
            )
        }
        else
        {
            return (
                <div className="row">
                    <div className="col-md-8">
                        <Candidates onClick={this.ClickHandler.bind(this)} applicants={this.state.FilteredApplicants} />
                        <p />                        
                        Adittional option
                        <hr />
                        <p />
                        <Candidates onClick={this.ClickHandler.bind(this)} applicants={this.state.AdittionalFilteredApplicants} />
                    </div>
                    <div className="col-md-4 soup white">
                        <br />   
                        <SearchStackSolo onChangeS={this.onChange.bind(this)} onChange={this.expOnChange.bind(this)} technologies={this.state.SortedTechnoligies}/>                     
                    </div>
                </div>              
                )
        }
        
    }

    //Render
    render() {      
        return (
            <div className="container-fluid">
                <Navbar />
                <div className="container main">
                    {this.Render()}                   
                </div>
            </div>
        );
    }
};


