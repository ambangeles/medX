import React, { Component } from "react";
import {
  Col,
  Row,
  FormGroup,
  Button,
  Label,
  Input,
  Container,
  NavLink,
  Form,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { editInfoC } from "../../actions/authActions";
import CircularProgress from "@material-ui/core/CircularProgress";

class EditAbout extends Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    sex: "",
    contactNumber: "",
    loading: false
  };

  componentDidMount() {
    const {
      firstName,
      middleName,
      lastName,
      birthMonth,
      birthDay,
      birthYear,
      sex,
      contactNumber
    } = this.props.auth.clinician;
    this.setState({
      firstName,
      middleName,
      lastName,
      birthMonth,
      birthDay,
      birthYear,
      sex,
      contactNumber
    });
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "EDIT_INFO_FAIL") {
        this.setState({ msg: error.msg.msg, loading: false });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const {
      firstName,
      middleName,
      lastName,
      birthMonth,
      birthDay,
      birthYear,
      sex,
      contactNumber
    } = this.state;

    const user = {
      firstName,
      middleName,
      lastName,
      birthMonth,
      birthDay,
      birthYear,
      sex,
      contactNumber
    };
    this.props.editInfoC(user);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.props.auth.msg === "EDIT_INFO_SUCCESS") {
      window.location.assign("/profile");
    }
    return (
      <Container>
        <div>
          <h2 className="dataDesign">About You</h2>
          <Form onSubmit={this.onSubmit}>
            <Container>
              {this.state.msg ? (
                <Alert color="danger"> {this.state.msg}</Alert>
              ) : null}
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                      disabled
                      id="firstName"
                      value={this.state.firstName}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="middleName">Middle Name</Label>
                    <Input
                      disabled
                      id="middleName"
                      value={this.state.middleName}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input disabled id="lastName" value={this.state.lastName} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="birthMonth">Birthday</Label>
                    <Input
                      disabled
                      value={`${this.state.birthMonth} / ${this.state.birthDay} / ${this.state.birthYear}`}
                      id="birthMonth"
                    ></Input>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label for="sex">Sex</Label>
                    <Input disabled id="sex" value={this.state.sex}></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="contactNumber">Contact Number</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="contactNumber"
                      id="contactNumber"
                      placeholder="Contact Number"
                      value={this.state.contactNumber}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={9}>
                  <Button
                    className="fixedright1"
                    color="primary"
                    style={{
                      marginTop: "20px",
                      borderRadius: "50px",
                      fontWeight: "bold",
                      width: "80px",
                      height: "40px"
                    }}
                    disabled={this.state.loading}
                  >
                    {this.state.loading ? (
                      <CircularProgress color="light" size="25px" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                  <NavLink
                    href="/profile"
                    style={{
                      float: "right",
                      color: "rgb(0,123,255)",
                      marginTop: "20px"
                    }}
                  >
                    <b>Cancel</b>
                  </NavLink>
                </Col>
              </Row>
            </Container>
          </Form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { editInfoC })(EditAbout);
