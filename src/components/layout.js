import React, { Component } from "react";
import "../App.css";
import {
  Container,
  Menu,
} from "semantic-ui-react";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions/auth";
import { Link } from "react-router-dom";


class Layout extends Component {
  componentDidMount() {
    this.props.autoSignin();
  }

  render() {
    

    
    return (

      <div>
        <Menu inverted>
          <Container>
            <Link to="/">
              <Menu.Item header>Animal Dating App</Menu.Item>
            </Link>
            <Link to="/">
              <Menu.Item>Home</Menu.Item>
            </Link>
            <Menu.Menu position="right">
              {this.props.authenticated ? (
                <>
                  <React.Fragment>
                    <Link to="/shelter">
                      <Menu.Item>Welcome</Menu.Item>
                    </Link>
                  </React.Fragment>
                  <React.Fragment>
                    <Link to="/pets">
                      <Menu.Item>Pets</Menu.Item>
                    </Link>
                  </React.Fragment>

                  <React.Fragment>
                    
                    <Menu.Item onClick={() => this.props.logout()}>
                      Logout
                    </Menu.Item>

                  </React.Fragment>


                </>




              ) : (
                <React.Fragment>
                  <Link to="/login">
                    <Menu.Item>Login</Menu.Item>
                  </Link>
                  <Link to="/register">
                    <Menu.Item>SignUp</Menu.Item>
                  </Link>
                  <Link to="/registershelter">
                    <Menu.Item>Shelter-SignUp</Menu.Item>
                  </Link>

                </React.Fragment>
              )}
            </Menu.Menu>
          </Container>
        </Menu>

        {this.props.children}


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.token !== null,
    tok: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoSignin: () => dispatch(actionTypes.authCheckState()),
    logout: () => dispatch(actionTypes.authLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
