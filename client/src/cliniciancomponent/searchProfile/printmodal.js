import React from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
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
        <Button className="pmbutton" onClick={this.toggle2} color="link">
          <MdPrint size="25px" /> Print
        </Button>
        <Modal
          centered
          isOpen={this.state.modal2}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
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
