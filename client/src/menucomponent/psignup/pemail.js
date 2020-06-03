import React, { Component } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Button,
  Alert
} from "reactstrap";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { connect } from "react-redux";
import { matchCode } from "../../actions/authActions";
import CircularProgress from "@material-ui/core/CircularProgress";

class PEmail extends Component {
  state = {
    inputCode: "",
    msg: "",
    loading: false
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "MATCH_CODE_FAIL") {
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
    this.props.matchCode(this.props.auth.code, this.state.inputCode);
  };

  goBack = () => {
    window.location.assign("/patient");
  };

  render() {
    if (this.props.auth.msg === "MATCH_CODE_SUCCESS") {
      window.location.assign("/identity");
    }
    return (
      <Container>
        <div className="bottom">
          <Form onSubmit={this.onSubmit}>
            <h2 className="dataDesign">Email Verification</h2>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Row
              form
              style={{
                marginBottom: "425px"
              }}
            >
              <Col md={5}>
                <FormGroup>
                  <Label for="inputCode">
                    Enter 6-digit code sent to your email address.
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
            </Row>
            <Button
              color="primary"
              style={{ height: "75px", width: "75px", borderRadius: "50%" }}
              className="fixedright1"
              disabled={this.state.loading}
            >
              {this.state.loading ? (
                <CircularProgress color="light" size="50px" />
              ) : (
                <FaArrowRight size="50px" />
              )}
            </Button>
          </Form>
          <Button
            color="primary"
            style={{ height: "75px", width: "75px", borderRadius: "50%" }}
            className="fixedleft1"
            onClick={this.goBack}
          >
            <FaArrowLeft size="50px" />
          </Button>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth
});

export default connect(mapStateToProps, { matchCode })(PEmail);
