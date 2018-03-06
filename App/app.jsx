import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './Auth/auth.jsx';
import Registration from './Auth/registration.jsx';
import Header from './header/header.jsx';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <main>
                        <Switch>
                            <Route path="/auth" component={Auth} />
                            <Route path="/registration" component={Registration} />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
};