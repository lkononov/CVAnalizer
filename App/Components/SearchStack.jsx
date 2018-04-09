import React from 'react';
import Select from 'react-select';

export default class SearchStack extends React.Component {
    static isPrivate = true;
    constructor(props) {
        super(props);
        this.state = {
            value: []
        }
    }

    handleChange = (value) => {
        this.setState({ value });
        this.props.onChange(value)
    }

    render() {
        return (
            <div className="input-group statick sticky-top">
                <div className="col-md-12">
                    <Select
                        name="form-field-name"
                        value={this.state.value}
                        multi
                        removeSelected={false}
                        onChange={this.handleChange}
                        options={this.props.technologies}
                    />
                </div>
            </div>
        );
    }
};