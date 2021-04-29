import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { authSignupShelter } from "../store/actions/auth";
import { Link } from "react-router-dom";

class RegisterShelter extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handelSubmit = () => {
    const { username, email, password, confirm_password } = this.state;
    this.props.signup(username, email, password, confirm_password);
    this.setState({ username: "", email: "", password: "", confirm_password: "" });
  };

  render() {
    const { loading, error } = this.props;
    const { username, email, password, confirm_password } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Create a Shelter Account
          </Header>
          <Form size="large" onSubmit={this.handelSubmit} error={error}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                value={username}
                onChange={this.handleChange}
                icon="user"
                iconPosition="left"
                placeholder="Username"
              />
              <Form.Input
                fluid
                name="email"
                value={email}
                onChange={this.handleChange}
                icon="mail"
                iconPosition="left"
                placeholder="Email address"
              />
              <Form.Input
                fluid
                name="password"
                value={password}
                onChange={this.handleChange}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Form.Input
                fluid
                name="confirm_password"
                value={confirm_password}
                onChange={this.handleChange}
                icon="lock"
                iconPosition="left"
                placeholder="Confirm password"
                type="password"
              />
              {error && (
                <Message negative>
                <Message.Header>Unable to Signup</Message.Header>
                <p>Please check your credentials</p>
              </Message>
              )}
              <Button
                color="blue"
                loading={loading}
                disabled={loading}
                fluid
                size="large"
              >
                SignUp
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to="/login"> Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (username, email, password, confirm_password) =>
      dispatch(authSignupShelter(username, email, password, confirm_password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterShelter);
