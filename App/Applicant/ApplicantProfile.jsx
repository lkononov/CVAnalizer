import React from 'react';
import ApplicantCard from '../Components/ApplicantCard.jsx';

export default class ApplicantProfile extends React.Component {
    static isPrivate = true;
    constructor(props) {
        super(props);
        this.state = {
            applicantInfo: [],
        }
    }

    componentWillMount() {
        this.setState({ applicantInfo: this.props.info })
        console.log(this.state.applicantInfo)
    }
    render() {
        return (
            <div >
                <div className="row justify-content-around ">

                    <ApplicantCard HandleClose={this.props.HandleClose} info={this.props.info} />

                    <div className="col-md-8 padding">
                        <div className="soup white">
                            <h3 className="text-center">Nothifications</h3>
                            <hr />
                            <p />
                            Some super text
                        </div>
                        <div className="soup white">
                            <p/>
                            <h3 className="text-center">Technologies</h3>
                            <p/>
                         
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Technology</th>
                                        <th scope="col">Experience</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.info[0].tech.map(((tech, key) =>                                       
                                        <tr key={key}>
                                            <th scope="row">{key}</th>
                                            <td>{tech.tname}</td>
                                            <td>{tech.exp}</td>
                                        </tr>
                                         ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="soup white">
                            <h3 className="text-center">Portfolio</h3>
                            <hr />
                            <p />
                            Applicant projects here
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};