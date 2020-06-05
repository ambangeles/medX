import React from "react";
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  ModalBody,
  FormText,
  Alert
} from "reactstrap";
import { IoMdPerson, IoIosMale, IoIosFemale } from "react-icons/io";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./about";
import Practitioner from "./practitioner";
import { connect } from "react-redux";
import { uploadIcon } from "../../../actions/authActions";
import CircularProgress from "@material-ui/core/CircularProgress";

class Profile extends React.Component {
  state = {
    modal: false,
    collapsed: false,
    file: "",
    icon: "",
    loading: false,
    msg: ""
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "UPLOAD_ICON_FAIL") {
        this.setState({ msg: error.msg.msg, loading: false });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };
  toggle1 = () =>
    this.setState({
      modal: !this.state.modal
    });

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { email, icon } = this.props.auth.patient;
    const formData = new FormData();
    formData.append("file", this.state.file);
    this.props.uploadIcon(formData, email, icon);
  };

  render() {
    if (this.props.auth.msg === "UPLOAD_ICON_SUCCESS") {
      window.location.assign("/profile");
    }
    const { patient } = this.props.auth;
    return (
      <Container className="containera">
        <h2 className="dataDesign">Patient Profile</h2>
        <div className="navprofile1">
          <Row>
            <Col md="3">
              <div className="centerP dataDesign">
                {patient.icon ? (
                  <img
                    src={`/api/getIcon/${patient.icon}`}
                    style={{
                      borderRadius: "50%",
                      border: "2px solid",
                      borderColor: "#0e4466",
                      marginTop: "10px",
                      width: "150px",
                      height: "150px"
                    }}
                    alt="Icon"
                  />
                ) : (
                  <IoMdPerson
                    style={{
                      borderRadius: "50%",
                      border: "2px solid",
                      borderColor: "#0e4466",
                      marginTop: "10px"
                    }}
                    size="150px"
                  />
                )}
                <NavLink onClick={this.toggle1} style={{ color: "#007bff" }}>
                  Upload
                </NavLink>
              </div>
            </Col>
            <Col
              style={{
                marginTop: "auto",
                marginBottom: "auto"
              }}
              md="9"
            >
              <h2>
                <b
                  style={{ color: "#0e4466" }}
                >{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</b>
              </h2>
              <h3
                style={{ color: "#0e4466" }}
              >{`${patient.birthMonth} ${patient.birthDay}, ${patient.birthYear}`}</h3>
              <h3 style={{ color: "#0e4466" }}>
                {`${patient.sex}`}{" "}
                {patient.sex === "Female" ? <IoIosFemale /> : <IoIosMale />}
              </h3>
            </Col>
          </Row>
        </div>
        <Row>
          <Col lg="3">
            <div className="navprofile4">
              <Navbar color="faded" light>
                <Collapse isOpen={!this.state.collapsed} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink href="/profile">About</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/practitioners">
                        Your Practitioners
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </Col>
          <Col>
            <div className="container1">
              <Router>
                <Switch>
                  <Route exact path="/profile" component={About} />
                  <Route path="/practitioners" component={Practitioner} />
                </Switch>
              </Router>
            </div>
          </Col>
        </Row>
        <Modal
          centered
          isOpen={this.state.modal}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle1}
          size="lg"
        >
          <ModalBody>
            <Form
              onSubmit={this.onSubmit}
              action="/upload"
              method="POST"
              enctype="multipart/form-data"
            >
              <h2 className="dataDesign">Upload your Profile Picture</h2>
              {this.state.msg ? (
                <Alert color="danger"> {this.state.msg}</Alert>
              ) : null}
              <Input
                accept="image/*"
                type="file"
                name="file"
                id="file"
                onChange={this.onChange}
                label="Upload"
              />

              <FormText color="muted">
                We recommend to upload a 1x1 picture of yourself.
              </FormText>

              <Button
                color="primary"
                style={{
                  marginLeft: "1rem",
                  width: "80px",
                  borderRadius: "40px",
                  height: "40px",
                  fontWeight: "bold"
                }}
                className="fixedright1"
                disabled={this.state.loading}
              >
                {this.state.loading ? (
                  <CircularProgress color="light" size="25px" />
                ) : (
                  "Upload"
                )}
              </Button>
              <Button
                style={{
                  float: "right",
                  marginLeft: "1rem",
                  width: "80px",
                  borderRadius: "40px",
                  height: "40px"
                }}
                color="secondary"
                onClick={this.toggle1}
              >
                <b>Close</b>
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { uploadIcon })(Profile);
