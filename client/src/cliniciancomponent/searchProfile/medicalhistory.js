import React, { Fragment } from "react";
import {
  Container,
  NavLink,
  Table,
  Row,
  Col,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button
} from "reactstrap";
import { MdModeEdit } from "react-icons/md";
import { connect } from "react-redux";
import { view, getCHistory } from "../../actions/blockchainActions";
import ReactToPrint from "react-to-print";
import FmedicalHistory from "./fmedicalhistory";
import FmedicalHistory1 from "./fprint/fmedicalhistory";
import uuid from "uuid";

class MedicalHistory extends React.Component {
  state = {
    canInsert: null,
    canPrint: null
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

  history = (id) => {
    const { viewId, shareToken } = this.props.medrec;
    this.setState({ modal2: !this.state.modal2 });
    this.props.getCHistory(viewId, id, shareToken);
  };

  render() {
    const { clinician } = this.props.auth;
    const { view } = this.props.medrec;
    return (
      <Container>
        <div>
          <h2 className="floater-left1 dataDesign">Medical History</h2>
          {this.state.canInsert &&
          view.storage.usedStorage < view.storage.totalStorage ? (
            <NavLink href="/insertHistory" className="floater-right1">
              <MdModeEdit size="25px" />
              Update
            </NavLink>
          ) : null}
          <Container className="floater-left1 scrolls">
            <Table striped>
              <thead>
                <tr>
                  <th>Medical History ID</th>
                  <th>Date Updated</th>
                  <th>Clinician</th>
                </tr>
              </thead>
              {view.histories.length !== 0 ? (
                <tbody>
                  {view.histories.map(
                    ({ MedHisId, dateAdded, clinician }, index) => (
                      <tr key={index}>
                        <NavLink
                          style={{ padding: "0px", color: "#007BFF" }}
                          onClick={this.history.bind(this, MedHisId)}
                        >
                          <td>{MedHisId}</td>
                        </NavLink>
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
                    <td className="dataDesign">No Medical History</td>
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
                <FmedicalHistory />
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
                  {this.props.medrec.medHis !== null ? (
                    <FmedicalHistory1
                      ref={(el) => (this.componentRef2 = el)}
                      id={uuid.v4()}
                      today={new Date().toLocaleString("en-PH")}
                      name={`${clinician.firstName} ${clinician.middleName} ${clinician.lastName}`}
                      pastIllness={this.props.medrec.medHis.pastIllness.map(
                        (pastIllness) => (
                          <Row>
                            <Col xs="4" className="bordercolor">
                              {pastIllness.name}
                            </Col>
                            <Col className="bordercolor">
                              <Label>
                                Remarks:{" "}
                                {pastIllness.remarks === "" ? (
                                  <Fragment>None</Fragment>
                                ) : (
                                  pastIllness.remarks
                                )}
                              </Label>
                            </Col>
                          </Row>
                        )
                      )}
                      famIllness={this.props.medrec.medHis.famIllness.map(
                        (famIllness) => (
                          <Row>
                            <Col xs="4" className="bordercolor">
                              {famIllness.name}
                            </Col>
                            <Col className="bordercolor">
                              <Label>
                                Remarks:{" "}
                                {famIllness.remarks === "" ? (
                                  <Fragment>None</Fragment>
                                ) : (
                                  famIllness.remarks
                                )}
                              </Label>
                            </Col>
                          </Row>
                        )
                      )}
                      height={this.props.medrec.medHis.height}
                      weight={this.props.medrec.medHis.weight}
                      bloodType={this.props.medrec.medHis.bloodType}
                      immunization={this.props.medrec.medHis.immunization.map(
                        (immunization) => (
                          <Row>
                            <Col xs="4" className="bordercolor">
                              {immunization.name}
                            </Col>{" "}
                            <Col className="bordercolor"></Col>
                          </Row>
                        )
                      )}
                      hospitalizations={this.props.medrec.medHis.hospitalizations.map(
                        (hospitalizations) => (
                          <Row className="bordercolor">
                            <div className="divprint">
                              {hospitalizations.entry}
                            </div>
                          </Row>
                        )
                      )}
                      operations={this.props.medrec.medHis.operations.map(
                        (operations) => (
                          <Row className="bordercolor">
                            <div className="divprint">{operations.entry}</div>
                          </Row>
                        )
                      )}
                      medication={this.props.medrec.medHis.medication.map(
                        (medication) => (
                          <Row className="bordercolor">
                            <div className="divprint">{medication.entry}</div>
                          </Row>
                        )
                      )}
                      allergies={this.props.medrec.medHis.allergies.map(
                        (allergies) => (
                          <Row>
                            <Col xs="4" className="bordercolor">
                              {allergies.name}
                            </Col>
                            <Col className="bordercolor">
                              <Label>
                                Remarks:{" "}
                                {allergies.remarks === "" ? (
                                  <Fragment>None</Fragment>
                                ) : (
                                  allergies.remarks
                                )}
                              </Label>
                            </Col>
                          </Row>
                        )
                      )}
                      bodyArt={this.props.medrec.medHis.bodyArt.map(
                        (bodyArt) => (
                          <Row>
                            <Col xs="4" className="bordercolor">
                              {bodyArt.name}
                            </Col>
                            <Col className="bordercolor">
                              <Label>
                                Remarks:{" "}
                                {bodyArt.remarks === "" ? (
                                  <Fragment>None</Fragment>
                                ) : (
                                  bodyArt.remarks
                                )}
                              </Label>
                            </Col>
                          </Row>
                        )
                      )}
                      habits={this.props.medrec.medHis.habits.map((habits) => (
                        <Row>
                          <Col xs="4" className="bordercolor">
                            {habits.name}
                          </Col>
                          <Col className="bordercolor">
                            <Label>
                              Remarks:{" "}
                              {habits.remarks === "" ? (
                                <Fragment>None</Fragment>
                              ) : (
                                habits.remarks
                              )}
                            </Label>
                          </Col>
                        </Row>
                      ))}
                      visualAcuity={this.props.medrec.medHis.visualAcuity.map(
                        (visualAcuity) => (
                          <Row>
                            <Col xs="4" className="bordercolor">
                              {visualAcuity.name}
                            </Col>
                            <Col className="bordercolor">
                              OD: {visualAcuity.od}
                            </Col>
                            <Col className="bordercolor">
                              OS: {visualAcuity.os}
                            </Col>
                            <Col className="bordercolor">
                              Date {visualAcuity.date}
                            </Col>
                          </Row>
                        )
                      )}
                      menarchYear={this.props.medrec.medHis.menarchYear}
                      menarchAge={this.props.medrec.medHis.menarchAge}
                      mensDuration={this.props.medrec.medHis.mensDuration}
                      dysmennorrhea={this.props.medrec.medHis.dysmennorrhea}
                      sex={this.props.medrec.view.sex}
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

export default connect(mapStateToProps, { view, getCHistory })(MedicalHistory);
