import React, { Component } from "react";
import {
  Button,
  Modal,
  Col,
  Row,
  ModalBody,
  FormGroup,
  NavLink,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { connect } from "react-redux";
import { getNotiC } from "../actions/authActions";
import { AiOutlineClose } from "react-icons/ai";

export class Notimodal extends Component {
  state = {
    popoverOpen: false,
    modal: false,
    isRead: null
  };

  toggle2 = (isRead) => {
    this.setState({ modal: !this.state.modal, isRead });
  };

  toggle1 = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  goBack = (_id) => {
    this.props.getNotiC(_id);
    window.location.assign("/");
  };
  render() {
    const { notification } = this.props;
    return (
      <div onClick={this.toggle2.bind(this, notification.isRead)} color="link">
        <NavLink>
          {notification.notificationLogs}
          {this.state.isRead === false ? (
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
                  <b>Notification</b>
                  <Button
                    onClick={this.goBack.bind(this, notification._id)}
                    close
                  >
                    <AiOutlineClose color="red" />
                  </Button>
                </h2>
                <h5> {notification.notificationLogs}</h5>
              </ModalBody>
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

export default connect(mapStateToProps, { getNotiC })(Notimodal);
