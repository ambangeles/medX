import React, { Component } from "react";
import {
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Container,
  NavLink,
  Form,
  Button,
  Alert,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { setup, logout } from "../../actions/authActions";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FaRegAddressCard } from "react-icons/fa";

class POnestep extends Component {
  state = {
    msg: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    sex: "",
    address: "",
    civilStatus: "",
    nationality: "",
    religion: "",
    contactNumber: "",
    guardianName: "",
    relationship: "",
    guardianContactNo: "",
    loading: false
  };

  componentDidMount() {
    const user = this.props.auth.patient;
    this.setState({
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      birthMonth: user.birthMonth,
      birthDay: user.birthDay,
      birthYear: user.birthYear,
      sex: user.sex,
      address: user.address
    });
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "SETUP_FAIL") {
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
      address,
      sex,
      religion,
      civilStatus,
      nationality,
      contactNumber,
      guardianName,
      relationship,
      guardianContactNo
    } = this.state;
    const setup = {
      firstName,
      middleName,
      lastName,
      birthMonth,
      birthDay,
      birthYear,
      address,
      sex,
      religion,
      civilStatus,
      nationality,
      contactNumber,
      guardianName,
      relationship,
      guardianContactNo
    };
    this.props.setup(setup);
  };

  onClick = () => {
    this.props.logout();
  };

  render() {
    return (
      <Container>
        <div>
          <Form onSubmit={this.onSubmit}>
            <Container>
              <Row>
                <h2 className="dataDesign">
                  You're one step away from everything
                </h2>
                <p>
                  Fill all fields completely and correctly as much as possible
                </p>
              </Row>
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
                <Col md={4}>
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
                <Col md={9}>
                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="address"
                      id="address"
                      placeholder={"Address"}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="nationality">Nationality</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="nationality"
                      id="nationality"
                      placeholder="Nationality"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="civilStatus">Civil Status</Label>
                    <Input
                      onChange={this.onChange}
                      value={this.state.civilStatus}
                      type="select"
                      name="civilStatus"
                      id="civilStatus"
                    >
                      <option value="" disabled hidden>
                        Civil Status
                      </option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Widowed</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="religion">Religion</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="religion"
                      id="religion"
                      placeholder="Religion"
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="contactNumber">Contact Number</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="contactNumber"
                      id="contactNumber"
                      placeholder="Contact Number"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row md={12}>
                <h4 className="dataDesign">IN CASE OF EMERGENCY</h4>
              </Row>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label for="guardianName">Guardian Name</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="guardianName"
                      id="guardianName"
                      placeholder="Guardian Name"
                    />
                  </FormGroup>
                </Col>
                <Col lg={3}>
                  <FormGroup>
                    <Label for="relationship">Relationship</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="relationship"
                      id="relationship"
                      placeholder="Relationship"
                    />
                  </FormGroup>
                </Col>
                <Col lg={3}>
                  <FormGroup>
                    <Label for="guardianContactNo">Contact Number</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="guardianContactNo"
                      id="guardianContactNo"
                      placeholder="Contact Number"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Container>
            <Button
              id="PopoverFocus"
              color="primary"
              style={{
                fontWeight: "bold",
                paddingBottom: "20px",
                width: "80px",
                borderRadius: "40px",
                height: "40px"
              }}
              className="fixedright1"
              disabled={this.state.loading}
            >
              {this.state.loading ? (
                <CircularProgress color="light" size="26px" />
              ) : (
                "Done"
              )}
            </Button>
            <UncontrolledPopover
              trigger="hover"
              placement="bottom"
              target="PopoverFocus"
            >
              <PopoverHeader>
                <h2 style={{ marginBottom: "0px" }}>
                  <b>Note!</b>
                </h2>
              </PopoverHeader>
              <PopoverBody>
                <FaRegAddressCard size="60px" className="floater" />
                <h5>
                  We will first verify your account. Once complete, You will be
                  notified through email and you can now use your account!
                </h5>
              </PopoverBody>
            </UncontrolledPopover>
            {/* <NavLink
              style={{
                float: "right",
                color: "blue"
              }}
              onClick={this.onClick}
            >
              <b>Logout</b>
            </NavLink> */}
          </Form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth
});

export default connect(mapStateToProps, {
  setup,
  logout
})(POnestep);
