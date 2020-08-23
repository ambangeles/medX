import React, { Component } from "react";
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
import { connect } from "react-redux";
import { accept, cancel } from "../actions/blockchainActions";
import { viewProfile } from "../actions/authActions";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";

export class Notimodal extends Component {
  state = {
    popoverOpen: false,
    modal: false,
    modal2: false,
    duration: null,
    clinicianId: "",
    isRead: null,
    activeTab: "1"
  };

  toggle2 = (clinicianId, duration, isRead) => {
    this.props.viewProfile(clinicianId);
    this.setState({ modal: !this.state.modal, clinicianId, isRead });
    switch (duration) {
      case 86400:
        this.setState({
          duration: "24 hrs"
        });
        break;
      case 172800:
        this.setState({
          duration: "2 days"
        });
        break;
      case 604800:
        this.setState({
          duration: "1 week"
        });
        break;
      default:
        break;
    }
  };

  toggle1 = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
      duration: this.state.duration,
      clinicianId: this.state.clinicianId
    });
  };

  toggle3 = () => {
    this.setState({
      modal2: !this.state.modal2
    });
  };

  close = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  close1 = () => {
    this.setState({
      modal2: !this.state.modal2,
      activeTab: "1"
    });
  };

  deny = (clinicianId, _id) => {
    this.props.cancel(clinicianId, _id);
    this.setState({
      modal: !this.state.modal
    });
  };

  accept = (duration, _id) => {
    this.props.accept(this.state.clinicianId, duration, _id);
    this.setState({
      modal: !this.state.modal
    });
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    const { notification } = this.props;
    const { profile } = this.props.auth;
    if (
      this.props.medrec.msg === "ACCEPT_REQUEST_SUCCESS" ||
      this.props.medrec.msg === "CANCEL_REQUEST_SUCCESS"
    ) {
      window.location.assign("/");
    }
    return (
      <div
        onClick={this.toggle2.bind(
          this,
          notification.clinicianId,
          notification.duration,
          notification.isRead
        )}
        color="link"
      >
        <NavLink>
          {notification.notificationLogs}
          {!this.state.isRead ? (
            <Modal
              centered
              isOpen={this.state.modal}
              modalTransition={{ timeout: 700 }}
              backdropTransition={{ timeout: 1300 }}
              toggle1={this.toggle1}
              size="lg"
            >
              <ModalBody>
                <h2 className="dataDesign">
                  <b>Clinician access request</b>
                  <Button onClick={this.close} close>
                    <AiOutlineClose color="red" />
                  </Button>
                </h2>
                <h5> {notification.notificationLogs}</h5>
                <Row>
                  <Col>Reason: {notification.reason}</Col>
                </Row>
                <Row>
                  <Col>Duration: {this.state.duration}</Col>
                </Row>
                <Row>
                  <Col>Message: {notification.message}</Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <NavLink onClick={this.toggle3}>
                  <div className="dataDesign">View Profile</div>
                  <Modal
                    centered
                    isOpen={this.state.modal2}
                    modalTransition={{ timeout: 700 }}
                    backdropTransition={{ timeout: 1300 }}
                    size="small"
                  >
                    <ModalBody>
                      {!profile ? (
                        " "
                      ) : (
                        <div>
                          <Button onClick={this.close1} close>
                            <AiOutlineClose color="red" />
                          </Button>
                          <div
                            style={{ marginLeft: "25px" }}
                            className="centerP dataDesign"
                          >
                            {profile.icon ? (
                              <img
                                src={`/api/getIcon/${profile.icon}`}
                                style={{
                                  borderRadius: "50%",
                                  border: "2px solid",
                                  borderColor: "#0e4466",
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
                                  borderColor: "#0e4466"
                                }}
                                size="150px"
                              />
                            )}
                          </div>
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
                                      <b>About</b>
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
                                      <b>Patients</b>
                                    </NavLink>
                                  </NavItem>
                                </Nav>
                              </Navbar>
                              <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                  <div className="bgDesign">
                                    <Row
                                      style={{
                                        padding: "4px 4px"
                                      }}
                                    >
                                      <Col sm={3}>Name</Col>
                                      <Col sm={9} className="dataDesign">
                                        {`${profile.firstName} ${profile.middleName} ${profile.lastName}`}
                                      </Col>
                                    </Row>
                                    <Row style={{ padding: "4px 4px" }}>
                                      <Col sm={3}>Birthdate</Col>
                                      <Col sm={9} className="dataDesign">
                                        {`${profile.birthMonth} ${profile.birthDay}, ${profile.birthYear}`}
                                      </Col>
                                    </Row>
                                    <Row style={{ padding: "4px 4px" }}>
                                      <Col sm={3}>Age</Col>
                                      <Col sm={9} className="dataDesign">
                                        {`${profile.age} y/o`}
                                      </Col>
                                    </Row>
                                    <Row style={{ padding: "4px 4px" }}>
                                      <Col sm={3}>Sex</Col>
                                      <Col sm={9} className="dataDesign">
                                        {`${profile.sex}`}
                                      </Col>
                                    </Row>
                                    <Row style={{ padding: "4px 4px" }}>
                                      <Col sm={3}>Contact No.</Col>
                                      <Col sm={9} className="dataDesign">
                                        {profile.contactNumber
                                          ? profile.contactNumber
                                          : "N/A"}
                                      </Col>
                                    </Row>
                                  </div>
                                </TabPane>
                                <TabPane tabId="2">
                                  <Container className="containerProfile">
                                    <Container className="  profilePatient">
                                      <Table>
                                        <tbody>
                                          {profile.patients.map(
                                            (
                                              { icon, patientName, birthdate },
                                              index
                                            ) => (
                                              <tr key={index}>
                                                <td>
                                                  <Row>
                                                    <Col>
                                                      {icon ? (
                                                        <div className="displayimg">
                                                          <img
                                                            src={`/api/getIcon/${icon}`}
                                                            style={{
                                                              borderRadius:
                                                                "50%",
                                                              border:
                                                                "2px solid",
                                                              borderColor:
                                                                "#0e4466",
                                                              color: "#0e4466",
                                                              marginTop: "5px",
                                                              marginRight:
                                                                "10px",
                                                              width: "100px",
                                                              height: "100px"
                                                            }}
                                                            alt="Icon"
                                                          />
                                                        </div>
                                                      ) : (
                                                        <div className="displayimg">
                                                          <IoMdPerson
                                                            style={{
                                                              borderRadius:
                                                                "50%",
                                                              border:
                                                                "2px solid",
                                                              borderColor:
                                                                "#0e4466",
                                                              color: "#0e4466",
                                                              marginTop: "5px",
                                                              marginRight:
                                                                "10px"
                                                            }}
                                                            size="100px"
                                                          />
                                                        </div>
                                                      )}
                                                    </Col>
                                                    <Col lg="9">
                                                      <div className="display dataDesign">
                                                        {patientName}{" "}
                                                        <b>&nbsp;|&nbsp;</b>{" "}
                                                        {birthdate}
                                                      </div>
                                                    </Col>
                                                  </Row>
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </Table>
                                    </Container>
                                  </Container>
                                </TabPane>
                              </TabContent>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </ModalBody>
                  </Modal>
                </NavLink>
                <Button
                  style={{ borderRadius: "50px" }}
                  color="danger"
                  onClick={this.deny.bind(
                    this,
                    notification.clinicianId,
                    notification._id
                  )}
                >
                  <b>Deny</b>
                </Button>
                <Button
                  style={{ borderRadius: "50px" }}
                  className="primary"
                  color="primary"
                  onClick={this.accept.bind(
                    this,
                    notification.duration,
                    notification._id
                  )}
                >
                  <b>Accept</b>
                </Button>
              </ModalFooter>
            </Modal>
          ) : null}
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  medrec: state.medrec
});

export default connect(mapStateToProps, { accept, cancel, viewProfile })(
  Notimodal
);
