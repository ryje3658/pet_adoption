import React, { Component } from "react";
import "./App.css";
import Layout from "./components/layout";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import RegisterShelter from "./components/registershelter";
import {CardList} from "./components/card-list/pet-card.component";
import {Search} from "./components/search/search.component";
import CheckBox from "./components/checkbox"

class App extends Component {
  constructor() {
    super();
    this.state = {
      pets: [],
      searchField:""
    };
  }

  componentDidMount() {
    fetch('http://jensenry.pythonanywhere.com/api/pets/?format=json')
    .then(response => response.json())
    .then(names => this.setState({pets: names}))
  }

  render() {
    const {pets, searchField} = this.state;
    const filteredPets = pets.filter(item => {
      return Object.keys(item).some(key => 
        typeof item[key] === "string" && item[key].toLowerCase().includes(searchField.toLowerCase())
      );
    });
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
        <Search 
          placeholder="Search"
          handleChange= {e => this.setState({searchField: e.target.value})}
        />
        <CheckBox/>
        <CardList pets={filteredPets} /> 
      </div>
    );
  }
}

export default App;
