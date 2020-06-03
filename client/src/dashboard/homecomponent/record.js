import React, { Fragment } from "react";
import {
  Table,
  Form,
  NavLink,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import { getRecord } from "../../actions/blockchainActions";
import Fmedicalrecords from "./fmedicalrecord";
import Fmedicalrecords1 from "./fprint/fmedicalrecord";
import ReactToPrint from "react-to-print";
import uuid from "uuid";
class Records extends React.Component {
  state = {
    modal2: false
  };

  toggle2 = () => this.setState({ modal2: !this.state.modal2 });

  record = (id) => {
    this.props.getRecord(id);
    this.setState({ modal2: !this.state.modal2 });
  };

  render() {
    const {
      records,
      firstName,
      middleName,
      lastName
    } = this.props.auth.patient;
    if (records.length === 0) {
      return (
        <Container className="bgDesign">
          <Container className="medhis">
            <Table striped>
              <thead>
                <tr>
                  <th>Record ID</th>
                  <th>Date Added</th>
                  <th>Clinician</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> </td>
                  <td className="dataDesign">No Records</td>
                  <td> </td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </Container>
      );
    }
    return (
      <Container className="bgDesign">
        <Container className="medhis">
          <Table striped>
            <thead>
              <tr>
                <th>Record ID</th>
                <th>Date Updated</th>
                <th>Clinician</th>
              </tr>
            </thead>
            <tbody>
              {records.map(({ recordId, dateAdded, clinician }, index) => (
                <tr key={index}>
                  <td>
                    <NavLink
                      style={{ padding: "0px", color: "#007BFF" }}
                      onClick={this.record.bind(this, recordId)}
                    >
                      {recordId}
                    </NavLink>
                  </td>
                  <td>{dateAdded}</td>
                  <td>{clinician}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal
          centered
          isOpen={this.state.modal2}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          toggle2={this.toggle2}
          size="lg"
        >
          <ModalBody>
            <Fmedicalrecords />
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              style={{
                borderRadius: "20px",
                width: "120px",
                fontWeight: "bold"
              }}
              onClick={this.toggle2}
            >
              Go back
            </Button>

            <ReactToPrint
              pageStyle="@page {margin: 1in .5in;}"
              trigger={() => (
                <Button
                  block
                  color="primary"
                  style={{
                    borderRadius: "20px",
                    width: "120px",
                    fontWeight: "bold"
                  }}
                >
                  Print
                </Button>
              )}
              content={() => this.componentRef2}
            />

            <div style={{ display: "none" }}>
              {this.props.medrec.record !== null ? (
                <Fmedicalrecords1
                  ref={(el) => (this.componentRef2 = el)}
                  records={
                    <Fragment>
                      <Row className="bordercolor">
                        <Col className="center1">
                          <h3>CONSULTATION RECORDS</h3>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h6>Physical Examination Findings</h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="bordercolor" xs="2">
                          <h6>Vital Signs</h6>
                        </Col>
                        <Col className="bordercolor" xs="5">
                          <Col>
                            Blood Pressure:{" "}
                            {this.props.medrec.record.bloodPressure}
                          </Col>
                          <Col>
                            Pulse Rate: {this.props.medrec.record.pulseRate}
                          </Col>
                        </Col>
                        <Col className="bordercolor" xs="5">
                          <Col>
                            Respiratory Rate:{" "}
                            {this.props.medrec.record.respiratoryRate}
                          </Col>
                          <Col>
                            Temperature: {this.props.medrec.record.temperature}
                          </Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="bordercolor">Physical Examination</Col>
                        <Col className="bordercolor" xs="10">
                          <Row>
                            <Col className="bordercolor" xs="6">
                              HEENT
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Heart
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.heent}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.heart}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Lungs
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Abdomen
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.lungs}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.abdomen}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="12">
                              Extremities
                            </Col>
                            <Col className="bordercolor" xs="12">
                              <div className="divprint1">
                                {this.props.medrec.record.extremities}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="bordercolor">Laboratory Workups</Col>
                        <Col className="bordercolor" xs="10">
                          <Row>
                            <Col className="bordercolor" xs="6">
                              Complete Blood Count(CBC)
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Urinalysis
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.completeBloodCount}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.urinalysis}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Fecalysis
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Chest X-ray(CXR)
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.fecalysis}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.chestXray}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Ishihara Test
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Audio
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.isihiraTest}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.audio}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Psychological Exam
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Drug Test
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.psychologicalExam}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {this.props.medrec.record.drugTest}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="12">
                              Hepatitis B Test
                            </Col>
                            <Col className="bordercolor" xs="12">
                              <div className="divprint1">
                                {this.props.medrec.record.hepatitisBTest}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h6>Complaints</h6>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">
                          {this.props.medrec.record.complaints}
                        </div>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h6>Diagnosis</h6>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">
                          {this.props.medrec.record.diagnosis}
                        </div>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h6>Treatment</h6>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">
                          {this.props.medrec.record.treatment}
                        </div>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h6>Remarks</h6>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">
                          {this.props.medrec.record.remarks}
                        </div>
                      </Row>
                      <div class="divFooter">
                        Medical Record ID: {uuid.v4()}
                      </div>
                      <div class="divFooter">
                        Generated by: {firstName} {middleName} {lastName}
                      </div>

                      <div class="divFooter">
                        Date & Time: {new Date().toLocaleString("en-PH")}
                      </div>
                    </Fragment>
                  }
                />
              ) : null}
            </div>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  medrec: state.medrec
});

export default connect(mapStateToProps, { getRecord })(Records);
