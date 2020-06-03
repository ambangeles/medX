import React from "react";
import { updatePasswordC, logout } from "../../actions/authActions";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Redirect } from "react-router-dom";

class Password extends React.Component {
  state = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    loading: false,
    msg: ""
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for error
      if (error.id === "UPDATE_PASSWORD_FAIL") {
        this.setState({ msg: error.msg.msg, loading: false });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { currentPassword, newPassword, confirmPassword } = this.state;

    const user = {
      currentPassword,
      newPassword,
      confirmPassword
    };

    // Attempt to login
    this.props.updatePasswordC(user);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    if (this.props.auth.msg === "UPDATE_PASSWORD_SUCCESS") {
      this.props.logout();
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <div className="position">
          <h2 className="floater-left1 dataDesign">Password</h2>
        </div>
        <Container className="floater-left1">
          <Form onSubmit={this.onSubmit}>
            {this.state.msg ? (
              <Alert color="danger"> {this.state.msg}</Alert>
            ) : null}
            <FormGroup>
              <Col md={5}>
                <Label for="currentPassword">Current Password</Label>
                <Input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="Current Password"
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col md={5}>
                <Label for="newPassword">New Password</Label>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="New Password"
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col md={5}>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <Button
              color="primary"
              marginLeft="10px"
              style={{
                marginLeft: "1rem",
                fontWeight: "bold",
                width: "80px",
                borderRadius: "40px",
                height: "40px"
              }}
              disabled={this.state.loading}
            >
              {this.state.loading ? (
                <CircularProgress color="light" size="26px" />
              ) : (
                "Update"
              )}
            </Button>
          </Form>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { updatePasswordC, logout })(Password);
