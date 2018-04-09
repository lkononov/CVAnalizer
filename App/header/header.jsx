import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default class Header extends React.Component {
    static isPrivate = true;
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        const cookies = new Cookies();
        cookies.remove('ID');
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-toggleable navbar-light bg-faded navbar-expand-lg ">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/main">BCF Software</a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/main/proj">Projects</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth" onClick={this.handleClick}>Logout</Link>
                                </li>                           
                            </ul>                          
                        </div>
                    </nav>                         
            </header>
        );
    }
};