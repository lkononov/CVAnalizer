import React from 'react';
import Select from 'react-select';

//const fruits = [
//    { label: 'Banana', value: '1' },
//    { label: 'Apple', value: '2' },
//    { label: 'Mango', value: '3' },
//    { label: 'Goa', value: '4' },
//    { label: 'Grapes', value: '5' },
//    { label: 'Pine Apple', value: '6' },
//];

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
    }

    render() {
        console.log(this.state.value)
        return (
            <div className="input-group statick">
                <div className="col-md-12">
                    <Select
                        name="form-field-name"
                        value={this.state.value}
                        multi
                        removeSelected={false}
                        onChange={this.handleChange}
                        options={this.props.technologies}
                    />
                    <button className="btn colored" type="submit">button</button>
                </div>
            </div>
        );
    }
};