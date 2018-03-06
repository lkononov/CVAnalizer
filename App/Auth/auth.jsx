import React from 'react';
import axios from 'axios';

export default class Auth extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
   
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {     
        e.preventDefault();
        axios.post('/api/Api', 
        {
            username: this.state.username,
            password: this.state.password
        });
        
    }
    render() {
        return (
            <div>
                <div className="container">
                    <br />
                    <div className="row justify-content-md-center">
                        <div className="align-items-center col-md-6 ">
                            <form onSubmit={this.onSubmit}>
                                <div className="input-group input-group-sm mb-3 ">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">Username</span>
                                    </div>
                                    <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="username" value={this.username} onChange={this.onChange} />
                                </div>
                                <div className="input-group input-group-sm mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">Password</span>
                                    </div>
                                    <input type="password" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="password" value={this.password} onChange={this.onChange} />
                                </div>
                                <button className="btn btn-danger w-100" type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};