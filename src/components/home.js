import React, { Component } from "react";
import {
  Grid,
  Header,
} from "semantic-ui-react";

import dogAnimate from '../assets/beagle.gif'

class Home extends Component {
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 1000 }}>
          <Header as="h2" color="blue" textAlign="center">
              Welcome to Animal Dating Site
          </Header>
          <img src={dogAnimate} alt="dog" />
        </Grid.Column>




      </Grid>



    );
  }
}

export default Home;
