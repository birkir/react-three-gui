import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { Home } from './Home';
import { Babylon } from './Babylonjs';
import { Three } from './Three';

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link> // <Link to="/three">Three</Link> // <Link to="/babylon">Babylon</Link>
                </nav>

                <Switch>
                    <Route path="/three">
                        <Three />
                    </Route>
                    <Route path="/babylon">
                        <Babylon />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));