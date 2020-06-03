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
import { editInfo } from "../../../actions/authActions";
import CircularProgress from "@material-ui/core/CircularProgress";

class EditAbout extends Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    address: "",
    sex: "",
    religion: "",
    civilStatus: "",
    nationality: "",
    contactNumber: "",
    guardianName: "",
    relationship: "",
    guardianContactNo: "",
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
      address,
      sex,
      religion,
      civilStatus,
      nationality,
      contactNumber,
      guardianName,
      relationship,
      guardianContactNo
    } = this.props.auth.patient;

    this.setState({
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

    const {
      address,
      religion,
      civilStatus,
      nationality,
      contactNumber,
      guardianName,
      relationship,
      guardianContactNo
    } = this.state;

    const user = {
      religion,
      address,
      civilStatus,
      nationality,
      contactNumber,
      guardianName,
      relationship,
      guardianContactNo
    };
    this.setState({ loading: true });
    this.props.editInfo(user);
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
                <Col md={6}>
                  <FormGroup>
                    <Label for="address">Address</Label>
                    <Input
                      onChange={this.onChange}
                      type="text"
                      name="address"
                      id="address"
                      placeholder={"Address"}
                      value={this.state.address}
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
                      value={this.state.nationality}
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
                      <option>Widowed</option>x`
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
                      value={this.state.religion}
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
                      value={this.state.contactNumber}
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
                      value={this.state.guardianName}
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
                      value={this.state.relationship}
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
                      value={this.state.guardianContactNo}
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

export default connect(mapStateToProps, { editInfo })(EditAbout);
