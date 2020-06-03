import React from "react";
import { forgotPass } from "../actions/authActions";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Row
} from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";

class Password extends React.Component {
  state = {
    code: "",
    newPassword: "",
    confirmPassword: "",
    msg: "",
    loading: false,
    login: false
  };

  componentDidUpdate(prevProps) {
    const { error, auth } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "UPDATE_PASSWORD_FAIL") {
        this.setState({ msg: error.msg.msg, loading: false });
      } else {
        this.setState({ msg: null });
      }
    }
    if (auth.msg !== prevProps.auth.msg) {
      if (auth.msg === "UPDATE_PASSWORD_SUCCESS") {
        this.setState({
          msg: "You can now log in using your new password",
          loading: false,
          login: true
        });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.state.login) window.location.assign("/login");

    const { newPassword, confirmPassword } = this.state;

    const user = {
      newPassword,
      confirmPassword
    };

    // Attempt to update password
    this.props.forgotPass(user, this.props.match.params.token);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <div className="title">
              <a href="/">
                <img className="img2" src="/images/Medx.png" />
              </a>
            </div>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Form style={{ width: "400px" }} onSubmit={this.onSubmit}>
            {this.state.msg ? (
              <Alert
                color={
                  this.props.auth.msg === "UPDATE_PASSWORD_SUCCESS"
                    ? "success"
                    : "danger"
                }
              >
                {this.state.msg}
              </Alert>
            ) : null}
            <Col>
              <FormGroup>
                <Label for="newPassword">New Password</Label>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="New Password"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Button
              color="primary"
              style={{
                marginLeft: "1rem",
                borderRadius: "50px",
                fontWeight: "bold",
                width: "160px",
                height: "40px"
              }}
              disabled={this.state.loading}
            >
              {this.state.loading ? (
                <CircularProgress color="light" size="25px" />
              ) : this.state.login ? (
                "Log in"
              ) : (
                "Change password"
              )}
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { forgotPass })(Password);
