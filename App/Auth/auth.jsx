import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

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
        const cookies = new Cookies();
        e.preventDefault();
        axios.post('/Identity/CreateToken',
            {
                Username: this.state.username,
                Password: this.state.password,
            })
            .then((res) => {
                console.log("this is res", res);
                this.setState({ regRes: res.data })
                console.log(this.state.regRes);


                //this.props.history.push("/");
            }).catch((err) => {
                console.log(err)
            }).then(() => {
                axios.post('/api/Test',
                    {
                        Login: this.state.username,
                        PasswordH: this.state.password,
                    },
                    {
                        headers: { Authorization: "Bearer " + this.state.regRes.token }
                    }                 
                )
                    .then((res) => {
                        console.log("this is res", res);

                        this.props.history.push("/");
                    }).catch((err) => {
                        console.log(err)
                    });      
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
                                <button className="btn btn-success w-100" type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};