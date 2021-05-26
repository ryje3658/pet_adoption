import React, { Component } from "react";
import "./App.css";
import Layout from "./components/layout";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import RegisterShelter from "./components/registershelter";
import Pets from "./components/pets"
import Shelter from  "./components/shelter";
import PetForm from "./components/pet-forms/newpet";
import UpdateForm from "./components/pet-forms/updateform";




class App extends Component {

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
              <Route path='/pets' component={Pets}/>
              <Route path="/shelter" component={Shelter} />
              <Route path="/PetForm" component={PetForm} />
              <Route path="/UpdateForm" component={UpdateForm} />
            </Switch>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
