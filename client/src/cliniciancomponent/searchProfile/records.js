import React, { Fragment } from "react";
import {
  Container,
  NavLink,
  Table,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button
} from "reactstrap";
import { IoIosAddCircleOutline } from "react-icons/io";

import { connect } from "react-redux";
import { view, specificCRecord } from "../../actions/blockchainActions";
import Fmedicalrecords from "./fmedicalrecord";
import Fmedicalrecords1 from "./fprint/fmedicalrecord";
import ReactToPrint from "react-to-print";
import uuid from "uuid";

class Records extends React.Component {
  state = {
    modal2: false,
    canPrint: null,
    canInsert: null
  };
  componentDidMount() {
    const { permissions, viewId } = this.props.medrec;
    this.setState({
      canPrint:
        permissions[permissions.findIndex((per) => per.patientId === viewId)]
          .canPrint,
      canInsert:
        permissions[permissions.findIndex((per) => per.patientId === viewId)]
          .canInsert
    });
  }
  toggle2 = () => this.setState({ modal2: !this.state.modal2 });
  record = (id) => {
    const { shareToken, viewId } = this.props.medrec;
    this.setState({ modal2: !this.state.modal2 });
    this.props.specificCRecord(viewId, id, shareToken);
  };
  render() {
    const { clinician } = this.props.auth;
    const { view } = this.props.medrec;
    return (
      <Container>
        <div>
          <h2 className="floater-left1 dataDesign">Records</h2>
          {this.state.canInsert &&
          view.storage.usedStorage < view.storage.totalStorage ? (
            <NavLink href="/insertrecord" className="floater-right1">
              <IoIosAddCircleOutline size="25px" />
              Insert
            </NavLink>
          ) : null}
          <Container className="floater-left1 scrolls">
            <Table striped>
              <thead>
                <tr>
                  <th>Record ID</th>
                  <th>Date Updated</th>
                  <th>Clinician</th>
                </tr>
              </thead>
              {view.records.length !== 0 ? (
                <tbody>
                  {view.records.map(
                    ({ recordId, dateAdded, clinician }, index) => (
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
                    )
                  )}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td> </td>
                    <td className="dataDesign">No Records</td>
                    <td> </td>
                  </tr>
                </tbody>
              )}
            </Table>

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
                {this.state.canPrint === true ? (
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
                ) : null}

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
                                Temperature:{" "}
                                {this.props.medrec.record.temperature}
                              </Col>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="bordercolor">
                              Physical Examination
                            </Col>
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
                            <Col className="bordercolor">
                              Laboratory Workups
                            </Col>
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
                                    {
                                      this.props.medrec.record
                                        .completeBloodCount
                                    }
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
                            Generated by:{" "}
                            {`${clinician.firstName} ${clinician.middleName} ${clinician.lastName}`}
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
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  medrec: state.medrec,
  auth: state.auth
});

export default connect(mapStateToProps, { view, specificCRecord })(Records);
