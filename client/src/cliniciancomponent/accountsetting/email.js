import React, { Fragment } from "react";
import { sendEmail, updateEmailC, logout } from "../../actions/authActions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Alert,
  Row
} from "reactstrap";
import CircularProgress from "@material-ui/core/CircularProgress";

class EmailAddress extends React.Component {
  state = {
    email: "",
    codeLoading: false,
    updateLoading: false,
    msg: "",
    code: null,
    inputCode: null
  };

  componentDidUpdate(prevProps) {
    const { error, auth } = this.props;
    if (error !== prevProps.error) {
      // Check for error
      if (error.id === "EMAIL_SENT_FAIL" || error.id === "UPDATE_EMAIL_FAIL") {
        this.setState({
          msg: error.msg.msg,
          codeLoading: false,
          updateLoading: false
        });
      } else {
        this.setState({ msg: null });
      }
    } else if (auth.msg !== prevProps.auth.msg) {
      this.setState({ msg: "", code: auth.code });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ codeLoading: true });
    const { email, code, inputCode } = this.state;
    if (this.props.auth.msg !== "EMAIL_SENT_SUCCESS") {
      this.props.sendEmail(email);
    } else {
      this.setState({ updateLoading: true });
      this.props.updateEmailC({ email, code, inputCode });
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.props.auth.msg === "UPDATE_EMAIL_SUCCESS") {
      this.props.logout();
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <div className="position">
          <h2 className="floater-left1 dataDesign">Email Address</h2>
        </div>
        <Container className="floater-left1">
          <Form onSubmit={this.onSubmit}>
            {this.state.msg ? (
              <Alert color="danger"> {this.state.msg}</Alert>
            ) : null}

            {this.props.auth.msg === "EMAIL_SENT_SUCCESS" ? (
              <Fragment>
                <Col md={5}>
                  <FormGroup>
                    <Label for="inputCode">
                      Enter 6-digit code sent to your new email address.
                    </Label>
                    <Input
                      type="text"
                      name="inputCode"
                      id="inputCode"
                      placeholder="Enter confirmation code"
                      onChange={this.onChange}
                    />
                  </FormGroup>
                </Col>
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
                  disabled={this.state.updateLoading}
                >
                  {this.state.updateLoading ? (
                    <CircularProgress color="light" size="26px" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <FormGroup>
                  <Col md={5}>
                    <Label for="email">New email address</Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="New email address"
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
                    width: "110px",
                    borderRadius: "40px",
                    height: "40px"
                  }}
                  disabled={this.state.codeLoading}
                >
                  {this.state.codeLoading ? (
                    <CircularProgress color="light" size="26px" />
                  ) : (
                    "Send code"
                  )}
                </Button>
              </Fragment>
            )}
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

export default connect(mapStateToProps, { sendEmail, updateEmailC, logout })(
  EmailAddress
);
