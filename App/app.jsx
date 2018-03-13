import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Auth from './Auth/auth.jsx';
import Registration from './Auth/registration.jsx';
import Header from './header/header.jsx';
import Projects from './Components/Projects.jsx';

export default class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <main>
                        <Switch>
                            <Route path="/proj" component={Projects} />
                            <Route path="/auth" component={Auth} />
                            <Route path="/registration" component={Registration} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};