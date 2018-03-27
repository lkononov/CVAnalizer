import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import ApplicantCard from '../Components/ApplicantCard.jsx';
import ApplicantTechStack from '../Components/ApplicantTechStack.jsx';

export default class Candidates extends React.Component {
    static isPrivate = true;
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            disabled: true,
            sorted: []
        }
    }

    handleChange = (e) => {
        if (this.state.checked) {
            console.log("unchecked")
            this.setState({ checked: false });
            this.setState({ disabled: true });
        }
        else {
            console.log("checked")
            this.setState({ checked: true });
            this.setState({ disabled: false });
        }
    }

    NextCandidate = (e) => {
        this.setState({ checked: false });
        this.setState({ disabled: true });
    }

    render() {
        return (
            <div >                    
                <div id="accordion">
                    {this.props.applicants.map(((applicant, key) =>
                        <div className="card" key={key}>

                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                    <button className="btn btn-link" data-toggle="collapse" data-target={"#" + applicant.uid} aria-expanded="true" aria-controls="collapseOne" onClick={this.NextCandidate}>
                                        {applicant.name} {applicant.sname}
                                </button>
                            </h5>
                        </div>

                        <div id={applicant.uid} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-3">
                                        <h5> Cridentials </h5>

                                        <ApplicantCard applicant={applicant.name} disabled={this.state.disabled} cathegory={"Name"}/>
                                        <ApplicantCard applicant={applicant.sname} disabled={this.state.disabled} cathegory={"Ser Name"} />

                                    </div>
                                       
                                    <div className="col-md-3">
                                        <h5> Skills </h5>   
                                            
                                        <ApplicantTechStack applicant={applicant.tech} disabled={this.state.disabled} />  
                                            
                                    </div>
                                </div>

                                <hr />
                                <input type="checkbox" onClick={this.handleChange} checked={this.state.checked} /> Change Candidate data

                            </div>
                        </div>
                    </div>
                    ))
                } 
            </div>                                                                                    
        </div>
        );
    }
};