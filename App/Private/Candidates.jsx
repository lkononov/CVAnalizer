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
            sorted: [],
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

    handleClick = (e) => {
        this.props.onClick(e.currentTarget.dataset.id);
    }

    render() {
        return (
            <div >   
                {this.props.applicants.map(((applicant, key) =>
                    <div onClick={this.handleClick} className="user_search_card" data-id={applicant.uid} key={key}>
                        <h5><b>{applicant.name} {applicant.sname}</b></h5>
                        <hr />
                        <div className="row">
                            <div className="col-md-3">
                                <b>Position:</b>
                                <p /> Junior
                            </div>
                            <div className="col-md-3">
                                <b>Spec:</b>
                                <p /> Full Stack
                            </div>
                            <div className="col-md-3">
                                <b>Age:</b>
                                <p /> 26
                            </div>
                            <div className="col-md-3">
                                <b>Location:</b>
                                <p /> Opole
                            </div>
                        </div>

                    </div>
                ))
                }                                                                                   
        </div>
        );
    }
};