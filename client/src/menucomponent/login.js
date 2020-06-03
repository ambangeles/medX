import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";

class Login extends Component {
  state = {
    email: "",
    password: "",
    msg: null,
    loading: false
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg, loading: false });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
  };

  render() {
    return (
      <div className="CONTAINER">
        <div
          style={{
            width: "40%",
            marginLeft: "30%",
            marginRight: "30%",
            marginTop: "5%"
          }}
        >
          <h2 className="center">
            <b>Log In to MedX</b>
          </h2>
          <Form onSubmit={this.onSubmit}>
            {this.state.msg ? (
              <Alert color="danger"> {this.state.msg}</Alert>
            ) : null}
            <FormGroup>
              <Label for="email">Email Address</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="mb-3"
                onChange={this.onChange}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={this.onChange}
                className="border-radius"
              />
              <div
                style={{
                  marginTop: "5px"
                }}
              >
                <a href="/forgotpassword">Forgot password?</a>
              </div>

              <Button
                color="primary"
                style={{
                  marginTop: "1rem",
                  borderRadius: "40px",
                  height: "50px",
                  fontWeight: "bold"
                }}
                block
                disabled={this.state.loading}
              >
                {this.state.loading ? (
                  <CircularProgress color="light" />
                ) : (
                  "Log In"
                )}
              </Button>
            </FormGroup>
          </Form>
          <div>
            <h6 className="center" style={{ marginBottom: "0px" }}>
              Dont have an account? Sign Up
            </h6>
          </div>
          <div className="center" style={{ marginBottom: "0px" }}>
            <a href="/patient">as Patient</a>&nbsp;or&nbsp;
            <a href="/clinician">as Clinician</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
