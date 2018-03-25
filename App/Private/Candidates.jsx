import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

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
                    {this.props.candidates.map(((candidate, key) =>
                        <div className="card" key={key}>
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                    <button className="btn btn-link" data-toggle="collapse" data-target={"#" + candidate.uid} aria-expanded="true" aria-controls="collapseOne" onClick={this.NextCandidate}>
                                        {candidate.uName} {candidate.suName}
                                </button>
                            </h5>
                        </div>

                            <div id={candidate.uid} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body">
                                    <div className="row">

                                        <div className="col-md-3">
                                            <h5> Cridentials </h5>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        Name
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.uName} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        Ser Name
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.suName} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        Project 
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.exp} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div> 

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        Team
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.tName} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <h5> Object-oriented </h5>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        Python
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.piton} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        Java
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.java} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        C#
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.cisharp} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>

                                        </div>

                                        <div className="col-md-2">
                                            <h5> Imperative </h5>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        Pascal
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.pascal} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        PHP
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.php} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        GO
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.go} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>

                                        </div>

                                        <div className="col-md-2">
                                            <h5> Front-End </h5>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        Angular
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.angular} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        React
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.react} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>

                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        JQery
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" placeholder={candidate.jquery} aria-label="Text input with checkbox" disabled={this.state.disabled} />
                                            </div>

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