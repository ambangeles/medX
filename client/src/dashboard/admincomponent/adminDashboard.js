import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  Col,
  Row,
  ModalBody,
  NavLink,
  ModalFooter,
  NavItem,
  Navbar,
  Nav,
  TabContent,
  TabPane,
  Container,
  Table
} from "reactstrap";
import classnames from "classnames";
import {
  allPatients,
  allClinicians,
  logoutAdmin,
  denyPatient,
  acceptPatient,
  denyClinician,
  acceptClinician
} from "../../actions/authActions";
import { AiOutlineClose } from "react-icons/ai";
import CircularProgress from "@material-ui/core/CircularProgress";

class AdminDashboard extends Component {
  state = {
    modal1: false,
    modal: false,
    activeTab: "1",
    patient: null,
    clinician: null,
    ddisabled: false,
    adisabled: false,
    dloading: false,
    aloading: false
  };

  componentDidMount() {
    this.props.allPatients();
    this.props.allClinicians();
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  viewPatient = (patient) => {
    this.setState({ modal: !this.state.modal, patient });
  };

  viewClinician = (clinician) => {
    this.setState({ modal1: !this.state.modal1, clinician });
  };

  denyPatient = (id, photo, email) => {
    this.setState({
      dloading: !this.state.dloading,
      ddisabled: !this.state.ddisabled,
      adisabled: !this.state.adisabled
    });
    this.props.denyPatient(id, photo, email);
  };

  acceptPatient = (id, email) => {
    this.setState({
      aloading: !this.state.aloading,
      ddisabled: !this.state.ddisabled,
      adisabled: !this.state.adisabled
    });
    this.props.acceptPatient(id, email);
  };

  denyClinician = (id, photo, email) => {
    this.setState({
      dloading: !this.state.dloading,
      ddisabled: !this.state.ddisabled,
      adisabled: !this.state.adisabled
    });

    this.props.denyClinician(id, photo, email);
  };

  acceptClinician = (id, email) => {
    this.setState({
      dloading: !this.state.aloading,
      ddisabled: !this.state.ddisabled,
      adisabled: !this.state.adisabled
    });

    this.props.acceptClinician(id, email);
  };

  close = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    if (
      this.props.auth.msg === "DENY_SUCCESS" ||
      this.props.auth.msg === "ACCEPT_SUCCESS"
    ) {
      window.location.assign("/admin");
    }

    return (
      <Container>
        <Row>
          <Col>
            <div className="position">
              <h2 className="floater-left1 dataDesign">Accounts</h2>
              <NavLink
                style={{ paddingTop: "23px", color: "blue" }}
                onClick={this.props.logoutAdmin}
              >
                Log Out
              </NavLink>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Navbar>
              <Nav tabs justified>
                <NavItem className="navhome1 dataDesign">
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    <b>Patients</b>
                  </NavLink>
                </NavItem>
                <NavItem className="navhome1 dataDesign">
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    <b>Clinicians</b>
                  </NavLink>
                </NavItem>
              </Nav>
            </Navbar>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Container className="containera">
                  <Container className="container2">
                    <Container className="medhis">
                      <Table>
                        <tbody>
                          {this.props.auth.allPatients ? (
                            this.props.auth.allPatients.map((patient, _id) => (
                              <tr key={_id}>
                                <td>
                                  <NavLink
                                    style={{
                                      padding: "0px",
                                      color: "#007BFF"
                                    }}
                                    onClick={this.viewPatient.bind(
                                      this,
                                      patient
                                    )}
                                  >
                                    {patient.firstName}
                                  </NavLink>
                                  <Modal
                                    centered
                                    isOpen={this.state.modal}
                                    modalTransition={{ timeout: 700 }}
                                    backdropTransition={{ timeout: 1300 }}
                                    size="small"
                                  >
                                    <ModalBody>
                                      <div>
                                        <Button onClick={this.close} close>
                                          <AiOutlineClose color="red" />
                                        </Button>
                                      </div>
                                      <img
                                        src={`/api/image/${
                                          this.state.patient
                                            ? this.state.patient.photo
                                            : " "
                                        }`}
                                        style={{
                                          border: "2px solid",
                                          borderColor: "#0e4466",
                                          color: "#0e4466",
                                          marginTop: "5px",
                                          marginRight: "9px",
                                          width: "465px",
                                          height: "300px"
                                        }}
                                        alt="Icon"
                                      />
                                      <div>
                                        {this.state.patient ? (
                                          <Container className="floater-left1">
                                            <Row
                                              style={{
                                                padding: "4px 0px 4px 0px"
                                              }}
                                            >
                                              <Col sm={3}>Name</Col>
                                              <Col
                                                sm={9}
                                                className="dataDesign"
                                              >
                                                {`${this.state.patient.firstName} ${this.state.patient.middleName} ${this.state.patient.lastName}`}
                                              </Col>
                                            </Row>
                                            <Row
                                              style={{
                                                padding: "4px 0px 4px 0px"
                                              }}
                                            >
                                              <Col sm={3}>Birthdate</Col>
                                              <Col
                                                sm={9}
                                                className="dataDesign"
                                              >
                                                {`${this.state.patient.birthMonth} ${this.state.patient.birthDay}, ${this.state.patient.birthYear}`}
                                              </Col>
                                            </Row>
                                            <Row
                                              style={{
                                                padding: "4px 0px 4px 0px"
                                              }}
                                            >
                                              <Col sm={3}>Age</Col>
                                              <Col
                                                sm={9}
                                                className="dataDesign"
                                              >{`${this.state.patient.age} y/o`}</Col>
                                            </Row>
                                            <Row
                                              style={{
                                                padding: "4px 0px 4px 0px"
                                              }}
                                            >
                                              <Col sm={3}>Sex</Col>
                                              <Col
                                                sm={9}
                                                className="dataDesign"
                                              >{`${this.state.patient.sex}`}</Col>
                                            </Row>
                                            <Row
                                              style={{
                                                padding: "4px 0px 4px 0px"
                                              }}
                                            >
                                              <Col sm={3}>Address</Col>
                                              <Col
                                                sm={9}
                                                className="dataDesign"
                                              >{`${this.state.patient.address}`}</Col>
                                            </Row>
                                            <Row
                                              style={{
                                                padding: "4px 0px 4px 0px"
                                              }}
                                            >
                                              <Col sm={3}>Nationality</Col>
                                              <Col
                                                sm={9}
                                                className="dataDesign"
                                              >{`${this.state.patient.nationality}`}</Col>
                                            </Row>
                                          </Container>
                                        ) : (
                                          " "
                                        )}
                                      </div>
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button
                                        style={{
                                          borderRadius: "50px",
                                          width: "80px",
                                          height: "40px"
                                        }}
                                        color="danger"
                                        onClick={this.denyPatient.bind(
                                          this,
                                          patient._id,
                                          patient.photo,
                                          patient.email
                                        )}
                                        disabled={this.state.ddisabled}
                                      >
                                        {this.state.dloading ? (
                                          <CircularProgress
                                            color="light"
                                            size="26px"
                                          />
                                        ) : (
                                          <b>Deny</b>
                                        )}
                                      </Button>
                                      <Button
                                        style={{
                                          borderRadius: "50px",
                                          width: "80px",
                                          height: "40px"
                                        }}
                                        className="primary"
                                        color="primary"
                                        onClick={this.acceptPatient.bind(
                                          this,
                                          patient._id,
                                          patient.email
                                        )}
                                        disabled={this.state.adisabled}
                                      >
                                        {this.state.aloading ? (
                                          <CircularProgress
                                            color="light"
                                            size="26px"
                                          />
                                        ) : (
                                          <b>Accept</b>
                                        )}
                                      </Button>
                                    </ModalFooter>
                                  </Modal>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <td>No accounts</td>
                          )}
                        </tbody>
                      </Table>
                    </Container>
                  </Container>
                </Container>
              </TabPane>
              <TabPane tabId="2">
                <Container className="containera">
                  <Container className="container2">
                    <Container className="medhis">
                      <Table>
                        <tbody>
                          {this.props.auth.allClinicians ? (
                            this.props.auth.allClinicians.map(
                              (clinician, _id) => (
                                <tr key={_id}>
                                  <td>
                                    <NavLink
                                      style={{
                                        padding: "0px",
                                        color: "#007BFF"
                                      }}
                                      onClick={this.viewClinician.bind(
                                        this,
                                        clinician
                                      )}
                                    >
                                      {clinician.firstName}
                                    </NavLink>
                                    <Modal
                                      centered
                                      isOpen={this.state.modal1}
                                      modalTransition={{ timeout: 700 }}
                                      backdropTransition={{ timeout: 1300 }}
                                      size="small"
                                    >
                                      <ModalBody>
                                        <div>
                                          <Button onClick={this.close} close>
                                            <AiOutlineClose color="red" />
                                          </Button>
                                        </div>
                                        <img
                                          src={`/api/image/${
                                            this.state.clinician
                                              ? this.state.clinician.photo
                                              : " "
                                          }`}
                                          style={{
                                            border: "2px solid",
                                            borderColor: "#0e4466",
                                            color: "#0e4466",
                                            marginTop: "5px",
                                            marginRight: "9px",
                                            width: "465px",
                                            height: "300px"
                                          }}
                                          alt="Icon"
                                        />
                                        <div>
                                          {this.state.clinician ? (
                                            <Container className="floater-left1">
                                              <Row
                                                style={{
                                                  padding: "4px 0px 4px 0px"
                                                }}
                                              >
                                                <Col sm={3}>Name</Col>
                                                <Col
                                                  sm={9}
                                                  className="dataDesign"
                                                >
                                                  {`${this.state.clinician.firstName} ${this.state.clinician.middleName} ${this.state.clinician.lastName}`}
                                                </Col>
                                              </Row>
                                              <Row
                                                style={{
                                                  padding: "4px 0px 4px 0px"
                                                }}
                                              >
                                                <Col sm={3}>Birthdate</Col>
                                                <Col
                                                  sm={9}
                                                  className="dataDesign"
                                                >
                                                  {`${this.state.clinician.birthMonth} ${this.state.clinician.birthDay}, ${this.state.clinician.birthYear}`}
                                                </Col>
                                              </Row>
                                              <Row
                                                style={{
                                                  padding: "4px 0px 4px 0px"
                                                }}
                                              >
                                                <Col sm={3}>Age</Col>
                                                <Col
                                                  sm={9}
                                                  className="dataDesign"
                                                >{`${this.state.clinician.age} y/o`}</Col>
                                              </Row>
                                              <Row
                                                style={{
                                                  padding: "4px 0px 4px 0px"
                                                }}
                                              >
                                                <Col sm={3}>Sex</Col>
                                                <Col
                                                  sm={9}
                                                  className="dataDesign"
                                                >{`${this.state.clinician.sex}`}</Col>
                                              </Row>
                                              <Row
                                                style={{
                                                  padding: "4px 0px 4px 0px"
                                                }}
                                              >
                                                <Col sm={3}>Occupation</Col>
                                                <Col
                                                  sm={9}
                                                  className="dataDesign"
                                                >{`${this.state.clinician.occupation}`}</Col>
                                              </Row>
                                            </Container>
                                          ) : (
                                            " "
                                          )}
                                        </div>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button
                                          style={{
                                            borderRadius: "50px",
                                            width: "80px",
                                            height: "40px"
                                          }}
                                          color="danger"
                                          onClick={this.denyClinician.bind(
                                            this,
                                            clinician._id,
                                            clinician.photo,
                                            clinician.email
                                          )}
                                          disabled={this.state.ddisabled}
                                        >
                                          {this.state.dloading ? (
                                            <CircularProgress
                                              color="light"
                                              size="26px"
                                            />
                                          ) : (
                                            <b>Deny</b>
                                          )}
                                        </Button>
                                        <Button
                                          style={{
                                            borderRadius: "50px",
                                            width: "80px",
                                            height: "40px"
                                          }}
                                          className="primary"
                                          color="primary"
                                          onClick={this.acceptClinician.bind(
                                            this,
                                            clinician._id,
                                            clinician.email
                                          )}
                                          disabled={this.state.adisabled}
                                        >
                                          {this.state.aloading ? (
                                            <CircularProgress
                                              color="light"
                                              size="26px"
                                            />
                                          ) : (
                                            <b>Accept</b>
                                          )}
                                        </Button>
                                      </ModalFooter>
                                    </Modal>
                                  </td>
                                </tr>
                              )
                            )
                          ) : (
                            <td>No accounts</td>
                          )}
                        </tbody>
                      </Table>
                    </Container>
                  </Container>
                </Container>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, {
  allPatients,
  allClinicians,
  logoutAdmin,
  denyPatient,
  acceptPatient,
  denyClinician,
  acceptClinician
})(AdminDashboard);
