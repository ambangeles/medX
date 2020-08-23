import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import { loginAdmin } from "../actions/authActions";
import PropTypes from "prop-types";
import AdminDashboard from "../dashboard/admincomponent/adminDashboard";

class Admin extends Component {
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
    this.props.loginAdmin(user);
  };
  render() {
    return (
      <Fragment>
        {this.props.auth.isAuthenticated ? (
          <AdminDashboard />
        ) : (
          <div className="CONTAINER">
            <div
              style={{
                width: "40%",
                marginLeft: "30%",
                marginRight: "30%",
                marginTop: "5%"
              }}
            >
              <h2 className="center dataDesign">Log In as Admin</h2>
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
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { loginAdmin })(Admin);
