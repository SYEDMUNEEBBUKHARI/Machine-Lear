import React, { Component } from "react";
import Nave from "../src/components/navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
// import{Route,Router} from 'react-router'
import "./App.css";
import Cont from "../src/components/container/contaner";
import Io from "../src/components/io/io";
import styled from "styled-components";
import CityViewArrange from "./DASHBOARD/Cityportal/CityViewArrange";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import Foott from "../src/components/footer/footer";

// import axios from 'axios'

import WhyBlock from "../src/components/whyblock/whyblock";

import { Cube } from "styled-loaders-react";

import axios from "axios";
import { Switch, Route } from "react-router-dom";
import Login from "./components/navbar/Login";

import Dash from "./DASHBOARD/dashboard";
import Register from "./components/navbar/Register";
import { Router, Redirect } from "react-router-dom";
import Routes from "./Routes";
import Company from "./DASHBOARD/company";
import history from "./Services/history";
const Sylee = styled.div`
  .reddd {
    background-color: black;
  }
`;
class App extends Component {
  state = {
    loading: true,
    isFlipped: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  render() {
    return (
      <Router history={history}>
        <Sylee>
          {this.state.loading ? (
            <div className="load">
              <Cube color="#0EAD69" />
            </div>
          ) : (
            <React.Fragment>
              <div className="reddd">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/dashboard" component={Auth} />
                  <Route path="/companyportal" component={Company} />
                  <Route path="/cityviewportal" component={CityViewArrange} />
                </Switch>
              </div>
            </React.Fragment>
          )}
        </Sylee>
      </Router>
    );
  }
}
const Auth = () => {
  let tokens = localStorage.getItem("token");
  if (tokens) {
    return <Route path="/dashboard" component={Dash} />;
  } else {
    return <Redirect to="/" />;
  }
};

const Home = () => (
  <React.Fragment>
    <Nave />

    <Cont />
    <WhyBlock />
    <Io />

    <Foott></Foott>
  </React.Fragment>
);

export default App;
