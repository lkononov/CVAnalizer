import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <menu>
                    <ul>
                        <li>
                            <Link to="/">main</Link>
                        </li>
                        <li>
                            <Link to="/auth">auth</Link>
                        </li>
                        <li>
                            <Link to="/registration">reg</Link>
                        </li>
                    </ul>
                </menu>
            </header>
        );
    }
};