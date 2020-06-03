import React, { Component } from "react";
import {
  Button,
  Modal,
  Col,
  Row,
  ModalBody,
  FormGroup,
  NavLink,
  ModalFooter
} from "reactstrap";
import { connect } from "react-redux";
import { accept, cancel } from "../actions/blockchainActions";
import { AiOutlineClose } from "react-icons/ai";

export class Notimodal extends Component {
  state = {
    popoverOpen: false,
    modal: false,
    duration: null,
    clinicianId: "",
    isRead: null
  };

  toggle2 = (clinicianId, duration, isRead) => {
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

  close = () => {
    this.setState({
      modal: !this.state.modal
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

  render() {
    const { notification } = this.props;
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

export default connect(mapStateToProps, { accept, cancel })(Notimodal);
