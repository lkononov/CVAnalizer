import React from 'react';
import Navbar from '../header/header.jsx';
import Projects from './Projects.jsx';

export default class Main extends React.Component {
    static isPrivate = true;
    render() {
        return (
            <div>
                <Navbar />
                <Projects />
            </div>
        );
    }
};