import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

export default class Auth extends React.Component {
    static isPrivate = false
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
        const cookies = new Cookies();
        e.preventDefault();
        axios.post('/Identity/Login',
            {
                Login: this.state.username,
                PasswordH: this.state.password,
            })
            .then((res) => {
                this.setState({ regRes: res.data })
                cookies.set('ID', this.state.regRes.token);
                console.log(cookies.get('ID'));
                this.props.history.push("/main");
            }).catch((err) => {
                console.log(err)          
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
                                <div className="input-group mb-3 ">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" >Username</span>
                                    </div>
                                    <input type="text" className="form-control"name="username" value={this.state.username} onChange={this.onChange} />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" >Password</span>
                                    </div>
                                    <input type="password" className="form-control" name="password" value={this.password} onChange={this.onChange} />
                                </div>
                                <button className="btn btn-outline-primary w-100" type="submit">Login</button>
                                <p />
                                <Link to="/registration"><button className="btn btn-outline-primary w-100">Registration</button></Link>                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};