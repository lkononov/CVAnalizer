import React, { Component } from 'react';
import axios from 'axios';

class Registration extends Component {
    state = {
        email: '',
        username: '',
        password: '',
        cpassword: '',
        regRes: ''
    };

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log();
        axios.post('/api/adduser', {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            cpassword: this.state.cpassword,
        })
            .then((res) => {
                console.log("this is res", res);
                if (res.data === "ok") {
                    this.props.history.push("/auth");
                }
                this.setState({ regRes: res.data })
                console.log(this.state.regRes);
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
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email" aria-label="Recipient's username" aria-describedby="basic-addon2" name="email" value={this.email} onChange={this.onChange} />
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">@example.com</span>
                                    </div>
                                </div>
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
                                <div className="input-group input-group-sm mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">Confirm password</span>
                                    </div>
                                    <input type="password" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="cpassword" value={this.cpassword} onChange={this.onChange} />
                                </div>
                                <button className="btn btn-success w-100" type="submit">Register</button>
                            </div>
                        </form>
                    </div>
                    {this.state.regRes}
                </div>
            </div>
        );
    }
}

export default Registration;