import React, { Component } from "react";
import {
  Col,
  Row,
  Form,
  Label,
  Input,
  Container,
  Button,
  Alert,
  FormGroup
} from "reactstrap";
import { sendLink } from "../actions/authActions";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

class Forgotpassword extends Component {
  state = {
    email: "",
    msg: "",
    loading: false,
    again: false
  };

  componentDidUpdate(prevProps) {
    const { error, auth } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "EMAIL_SENT_FAIL") {
        this.setState({ msg: error.msg.msg, loading: false });
      } else {
        this.setState({ msg: null });
      }
    }
    if (auth.msg !== prevProps.auth.msg) {
      if (auth.msg === "EMAIL_SENT_SUCCESS") {
        this.setState({
          msg:
            "Password reset link sent. Please check your email if you received it. If you want to create a link again, click try again.",
          loading: false,
          again: true
        });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  send = (e) => {
    e.preventDefault();
    if (this.state.again) window.location.assign("/forgotpassword");
    this.setState({ loading: true });
    this.props.sendLink(this.state.email);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container>
        <div
          style={{
            marginRight: "25%",
            marginLeft: "25%"
          }}
        >
          <h2>
            <b>Find your MedX Account</b>
          </h2>
          <Row>
            <Form onSubmit={this.send}>
              {this.state.msg ? (
                <Alert
                  color={
                    this.props.auth.msg === "EMAIL_SENT_SUCCESS"
                      ? "success"
                      : "danger"
                  }
                >
                  {this.state.msg}
                </Alert>
              ) : null}
              <Col>
                <FormGroup>
                  <Label for="email">
                    Enter your email address. We'll check first if the email
                    address is registered
                  </Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    onChange={this.onChange}
                  />
                </FormGroup>
              </Col>
              <Button
                style={{
                  marginLeft: "1rem",
                  borderRadius: "50px",
                  fontWeight: "bold",
                  width: "100px",
                  height: "40px"
                }}
                color="primary"
                disabled={this.state.loading}
              >
                {this.state.loading ? (
                  <CircularProgress color="light" size="25px" />
                ) : this.state.again ? (
                  "Try again"
                ) : (
                  "Send link"
                )}
              </Button>
            </Form>
          </Row>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { sendLink })(Forgotpassword);
