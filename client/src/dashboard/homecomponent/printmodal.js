import React from "react";
import { Modal, ModalBody, ModalFooter, NavLink, Button } from "reactstrap";
import { MdPrint } from "react-icons/md";
import Fprint from "./fprint/fprint";
import { connect } from "react-redux";

class Printmodal extends React.Component {
  state = {
    modal: false,
    modal2: false
  };

  toggle1 = () =>
    this.setState({
      modal: !this.state.modal
    });

  toggle2 = () => {
    this.setState({
      modal2: !this.state.modal2
    });
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle2} className="button" color="link">
          <MdPrint size="30px" color="#0084b4" /> <b>PRINT</b>
        </NavLink>
        <Modal
          centered
          isOpen={this.state.modal2}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 600 }}
          toggle={this.toggle2}
          size="lg"
        >
          <ModalBody>
            <div>
              <Fprint />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              style={{ borderRadius: "50px" }}
              block
              color="secondary"
              onClick={this.toggle2}
            >
              <b>Cancel</b>
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  medrec: state.medrec
});

export default connect(mapStateToProps, null)(Printmodal);
