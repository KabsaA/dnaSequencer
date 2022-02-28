import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';

function App() {
    const [results, setResults] = useState([]);
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/">
                    <Home results={results} setResults={setResults} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;