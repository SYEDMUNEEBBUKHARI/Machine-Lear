import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Dashboard from '../DASHBOARD/dashboard'
import Register from '../components/navbar/Login'
import App from "../App"

import Home from "../App"
export default function Routes(){

return(
<Switch>

<Route exact path="/" component={Home} /> /> 
<Route path="/Register" component={Register} />
<Route path="/dashboard" component={Dashboard} />

    </Switch>



);


}