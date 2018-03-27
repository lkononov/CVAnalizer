import React from 'react';

export default class ApplicantCard extends React.Component {
    static isPrivate = true;
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        {this.props.cathegory}
                    </div>
                </div>
                <input type="text" className="form-control" placeholder={this.props.applicant} aria-label="Text input with checkbox" disabled={this.props.disabled} />
            </div>
        );
    }
};