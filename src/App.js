import React, { Component } from "react";
import "./App.css";
import Layout from "./components/layout";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import RegisterShelter from "./components/registershelter";
import {CardList} from './components/card-list/pet-card.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    fetch('http://jensenry.pythonanywhere.com/api/pets/?format=json')
    .then(response => response.json())
    .then(names => this.setState({pets: names}))
  }

  render() {
    return (
      <div>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/registershelter" component={RegisterShelter} />
            </Switch>
          </Layout>
        </Router>
        <CardList pets={this.state.pets} /> 
      </div>
    );
  }
}

export default App;
