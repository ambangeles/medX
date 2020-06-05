import React from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  NavLink
} from "reactstrap";
import { FaFacebook, FaInstagram, FaRegCopyright } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import Terms from "./terms";
import Privacy from "./privacy";

class Homepage extends React.Component {
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
        <div>
          <Container
            fluid
            style={{
              width: "100%",
              height: "100%",
              float: "left",
              position: "absolute",
              backgroundImage: "url(/images/1.2.png)",
              backgroundRepeat: "no-repeat",
              backgroundPositionX: "100%"
            }}
          >
            <div className="margintop" style={{ marginTop: "10%" }}>
              <h1>
                <b>
                  Store your medical records,
                  <br />
                  in the right manner
                </b>
              </h1>
              <p>
                Having blockchain at core, we provide a secure platform for the
                <br />
                management and distribution of your medical record
              </p>
              <h5 style={{ marginBottom: "30px" }}>
                <b>Get started as a...</b>
              </h5>
              <Button
                href="/patient"
                style={{
                  marginRight: "1rem",
                  borderRadius: "40px",
                  width: "150px",
                  position: "relative"
                }}
                color="primary"
              >
                <b> Patient</b>
              </Button>
              <Button
                href="/clinician"
                style={{
                  marginRight: "1rem",
                  borderRadius: "40px",
                  width: "150px"
                }}
                color="primary"
              >
                <b>Clinician</b>
              </Button>
            </div>
          </Container>
        </div>
        <div
          style={{
            marginTop: "650px",
            width: "100%",
            height: "100%",
            position: "absolute"
          }}
        >
          <Container
            fluid
            style={{
              width: "100%",
              height: "100%",
              float: "right",
              position: "absolute",
              backgroundImage: "url(/images/2.1.png)",
              backgroundRepeat: "no-repeat",
              backgroundPositionX: "2%"
            }}
          >
            <div
              className="margintop"
              style={{
                marginTop: "15%",
                marginRight: "7%",
                textAlign: "right",
                marginLeft: "-30%"
              }}
            >
              <h1>
                <b>
                  Maximizing the potential <br /> of your medical record
                </b>
              </h1>
              <p>
                We created an interoperable system where your medical <br />
                records are updated in real time which in turn, helping
                <br /> healthcare providers in providing the best quality of
                <br />
                healthcare you deserve
              </p>
            </div>
          </Container>
        </div>
        <div
          style={{
            marginTop: "1350px",
            position: "absolute",
            width: "95%",
            height: "95%"
          }}
        >
          <h1 style={{ textAlign: "center", marginLeft: "1%" }}>
            <b>MedX Features</b>
          </h1>
          <Row>
            <Col lg="6" style={{ textAlign: "center", marginTop: "50px" }}>
              <img
                style={{
                  height: "150px",
                  weight: "auto",
                  marginBottom: "10px"
                }}
                src="/images/tap.png"
                alt="Clip art"
              />
              <h5>
                <b>Accessibility and Convenience</b>
              </h5>
              <p>
                You no longer need to approach hospitals or clinics for
                <br /> information. For patients, you can access your whole
                <br /> medical records anytime at your fingertips. For
                <br /> healthcare providers, you can access a database of
                <br /> patients provided that they granted you access. The
                <br />
                information you receive is up to date, accurate and <br />
                streamlined to your specific inquiries.
              </p>
            </Col>
            <Col lg="6" style={{ textAlign: "center", marginTop: "50px" }}>
              <img
                style={{
                  height: "150px",
                  weight: "auto",
                  marginBottom: "10px"
                }}
                src="/images/secure-data.png"
                alt="Clip art"
              />
              <h5>
                <b>Control and Privacy</b>
              </h5>
              <p>
                Patients have the ability to grant access of their medical
                <br />
                records as well as revoking access by setting up a time <br />
                limited gateway, thereby improving their experience and <br />
                guaranteeing data security.
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg="6" style={{ textAlign: "center", marginTop: "50px" }}>
              <img
                style={{
                  height: "150px",
                  weight: "auto",
                  marginBottom: "10px"
                }}
                src="/images/files-and-folders.png"
                alt="Clip art"
              />
              <h5>
                <b>
                  Absolute Medical Records
                  <br /> in Real Time
                </b>
              </h5>
              <p>
                Using MedX's solution, healthcare providers can give <br />
                their patients a higher level of medical services. Utilizing
                <br />
                and sharing of medical records can maximize patient <br />
                satisfaction by offering personalized care based on their
                <br />
                complete indexed history of medical records.
              </p>
            </Col>
            <Col lg="6" style={{ textAlign: "center", marginTop: "50px" }}>
              <img
                style={{
                  height: "150px",
                  weight: "auto",
                  marginBottom: "10px"
                }}
                src="/images/blockchain.png"
                alt="Clip art"
              />
              <h5 style={{ marginBottom: "30px" }}>
                <b>Blockchain Technology</b>
              </h5>

              <p>
                Be assured your data is secure using blockchain <br />
                technology. Blockchain minimizes private information
                <br /> leakage risks and maximizes credibilitiy of medical
                <br />
                records.
              </p>
            </Col>
          </Row>
        </div>
        <div
          className="marginFooter"
          style={{
            position: "absolute",
            width: "100%",
            padding: "50px",
            paddingBottom: "0px",
            backgroundColor: "rgb(242, 242, 242)"
          }}
        >
          <Col>
            <Row>
              <Col lg="3">
                <h3>
                  <b>Contact Us</b>
                </h3>
                <p style={{ paddingTop: "15px" }}>info@medx.com</p>
              </Col>
              <Col lg="3">
                <h3>
                  <b>Connect</b>
                </h3>
                <a href="#">
                  <FaFacebook
                    size="60px"
                    color="darkblue"
                    style={{ paddingTop: "15px", marginRight: "10px" }}
                  />
                </a>
                <a href="#">
                  <AiFillTwitterCircle
                    size="65px"
                    color="blue"
                    style={{ paddingTop: "15px", marginRight: "10px" }}
                  />
                </a>
                <a href="#">
                  <FaInstagram
                    size="60px"
                    color="red"
                    style={{ paddingTop: "15px", marginRight: "10px" }}
                  />
                </a>
              </Col>
              <Col lg="3">
                <p
                  className="marginLeftFooter"
                  style={{
                    textAlign: "center"
                  }}
                >
                  <NavLink onClick={this.toggle1}>
                    <b>Privacy Policy</b>
                  </NavLink>
                </p>
                <hr />
                <p
                  className="marginLeftFooter"
                  style={{
                    textAlign: "center"
                  }}
                >
                  <NavLink onClick={this.toggle2}>
                    <b>Terms and Condition</b>
                  </NavLink>
                </p>
              </Col>
              <Col
                lg="3"
                style={{
                  marginBottom: "50px"
                }}
              >
                <img className="img2" src="/images/Medx.png" />
                <p>
                  <FaRegCopyright /> 2020 MedX. All rights reserved.
                </p>
              </Col>
            </Row>
          </Col>
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
                <Terms />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                style={{ borderRadius: "50px" }}
                block
                color="secondary"
                onClick={this.toggle2}
              >
                <b>Close</b>
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            centered
            isOpen={this.state.modal}
            modalTransition={{ timeout: 700 }}
            backdropTransition={{ timeout: 1300 }}
            toggle={this.toggle1}
            size="lg"
          >
            <ModalBody>
              <div>
                <Privacy />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                style={{ borderRadius: "50px" }}
                block
                color="secondary"
                onClick={this.toggle1}
              >
                <b>Close</b>
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
export default Homepage;
