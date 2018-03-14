import React from 'react';
import Navbar from '../header/header.jsx';
import Projects from './Projects.jsx';
import Candidates from './Candidates.jsx';

export default class Main extends React.Component {
    static isPrivate = true;
    render() {
        return (
            <div>
                <Navbar />
                <Candidates />
                <Projects />
            </div>
        );
    }
};