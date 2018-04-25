import React from 'react';
import Select from 'react-select';

var options =[
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
];

export default class SearchStackSolo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            svalue: []
        }
    }

    handleChange = (value) => {
        this.setState({ value }, () => {
            
            this.handleChangeSkills(this.state.svalue);
        });   
        this.props.onChange(value);
    }
    
    handleChangeSkills = (svalue) => {
        this.setState({ svalue });
        this.props.onChangeS(svalue);
    }

    render() {
        const { value } = this.state;
        return (
            <div className="input-group">
                <div className="col-md-12">
                    <Select
                        name="form-field-name"
                        placeholder="Select required technology(s)"
                        value={this.state.svalue}
                        multi
                        removeSelected={false}
                        onChange={this.handleChangeSkills}
                        options={this.props.technologies}
                    />
                    <p/>
                    <Select
                        name="form-field-name"
                        placeholder="Select required experience"
                        value={value}
                        removeSelected={false}
                        onChange={this.handleChange}
                        options={options}
                    />
                </div>
            </div>
        );
    }
};