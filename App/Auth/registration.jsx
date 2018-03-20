import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Registration extends Component {
    static isPrivate = false
    state = {
        username: '',
        password: '',
        regRes: '',
    };

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.post('/Identity/Registration', {
            Login: this.state.username,
            PasswordH: this.state.password,
        })
            .then((res) => {
                console.log("this is res", res);  
                    this.setState({ regRes: res.data })
                        console.log(this.state.regRes);                     
                             //this.props.history.push("/auth");            
            }).catch((err) => {
                console.log(err)
            });
    }

    render() {
        return (
            <div className="container">
                <br />
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">                
                                <div className="input-group input-group-sm mb-3">
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
                                <button className="btn btn-success w-100" type="submit">Register</button>
                                <p />
                                <Link to="/auth"><button className="btn btn-primary w-100">Login</button></Link>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;