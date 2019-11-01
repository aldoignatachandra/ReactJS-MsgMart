import React from 'react';
import { BrowserRouter as Router , Redirect} from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

//Content Import
import Login from "./Components/Page/Login";
import SignUp from "./Components/Page/SignUp";
import Dashboard from "./Components/Page/Dashboard";
// import Register from './Component/Auth/Resgister';

const AppRouter = () => (
    
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/signup' component={SignUp} />   
                <Route path='/dashboard' component={Dashboard} />
            </Switch>
        </div>
    </Router>
)

export default AppRouter;