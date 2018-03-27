import React from 'react';

export default class ApplicantTechStack extends React.Component {
    static isPrivate = true;
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            {this.props.applicant.map(((applicant, key) =>
                <div className="input-group mb-3" key={key}>
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            {applicant.tname}
                        </div>
                    </div>
                    <input type="text" className="form-control" placeholder={applicant.exp} aria-label="Text input with checkbox" disabled={this.props.disabled} />
                </div>
            ))
            }
        </div>
        )
    }
};