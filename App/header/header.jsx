import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-toggleable navbar-light bg-faded navbar-expand-lg">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">Navbar</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/"><a className="nav-link" href="#">Home</a></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to="/registration"><a className="nav-link" href="#">Registration</a></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/auth"><a className="nav-link" href="#">Authorisation</a></Link>
                            </li>                          
                            </ul>                          
                        </div>
                    </nav>                         
            </header>
        );
    }
};