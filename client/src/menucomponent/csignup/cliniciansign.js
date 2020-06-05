import React, { Component } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
  Button,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { FaArrowRight } from "react-icons/fa";
import { firstStepC } from "../../actions/authActions";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FaRegAddressCard } from "react-icons/fa";

export class ClinicianUser extends Component {
  state = {
    msg: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    sex: "",
    email: "",
    password: "",
    confirmPassword: "",
    occupation: "",
    loading: false
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "FIRST_STEP_FAIL") {
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
    const {
      firstName,
      middleName,
      lastName,
      birthMonth,
      birthDay,
      birthYear,
      sex,
      email,
      password,
      confirmPassword
    } = this.state;
    const firstStep = {
      firstName,
      middleName,
      lastName,
      birthMonth,
      birthDay,
      birthYear,
      sex,
      email,
      password,
      confirmPassword
    };
    this.props.firstStepC(firstStep);
  };

  render() {
    if (this.props.auth.msg === "FIRST_STEP_SUCCESS") {
      window.location.assign("/cverify");
    }
    return (
      <Container className="pmargin">
        <Form onSubmit={this.onSubmit} className="pmargin">
          <h2 className="dataDesign">MedX for Clinicians</h2>
          {this.state.msg ? (
            <Alert color="danger"> {this.state.msg}</Alert>
          ) : null}
          <Row>
            <Col md={5}>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label for="middleName">Middle Name</Label>
                <Input
                  type="text"
                  name="middleName"
                  id="middleName"
                  placeholder="Middle Name"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="sex">Sex</Label>
                <Input
                  className="inputers"
                  type="select"
                  name="sex"
                  id="sex"
                  onChange={this.onChange}
                  value={this.state.sex}
                >
                  <option value="" disabled hidden>
                    Sex
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col style={{ marginBottom: "10px" }}>Birthday</Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Input
                  className="inputers"
                  type="select"
                  name="birthMonth"
                  id="birthMonth"
                  value={this.state.birthMonth}
                  onChange={this.onChange}
                >
                  <option value="" disabled hidden>
                    Month
                  </option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Input
                  type="text"
                  name="birthDay"
                  id="birthDay"
                  placeholder="Day"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Input
                  type="text"
                  name="birthYear"
                  id="birthYear"
                  placeholder="Year"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FormGroup>
                <Label for="email">Email Address</Label>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
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
          </Row>
          <Button
            id="PopoverFocus"
            color="primary"
            style={{
              height: "75px",
              width: "75px",
              borderRadius: "50%"
            }}
            className="fixedright1"
            disabled={this.state.loading}
          >
            {this.state.loading ? (
              <CircularProgress color="light" size="50px" />
            ) : (
              <FaArrowRight size="50px" />
            )}
          </Button>
          <UncontrolledPopover
            trigger="hover"
            placement="bottom"
            target="PopoverFocus"
          >
            <PopoverHeader>
              <h2 style={{ marginBottom: "0px" }}>
                <b>Tip!</b>
              </h2>
            </PopoverHeader>
            <PopoverBody>
              <FaRegAddressCard size="60px" className="floater" />
              <h5>
                Have your valid ID with you for the verification of your
                identity in the last step.
              </h5>
            </PopoverBody>
          </UncontrolledPopover>
        </Form>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth
});

export default connect(mapStateToProps, { firstStepC })(ClinicianUser);
