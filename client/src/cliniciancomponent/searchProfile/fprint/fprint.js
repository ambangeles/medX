import React, { Fragment } from "react";
import ReactToPrint from "react-to-print";
import { Row, Col, Container, Button } from "reactstrap";
import Fpersonalrecord from "./fpersonalrecord";
import Fmedicalhistory from "./fmedicalhistory";
import Fmedicalrecords from "./fmedicalrecord";
import FAllmedical from "./fallmedical";
import { connect } from "react-redux";
import { allRecords } from "../../../actions/blockchainActions";
import uuid from "uuid";

class Fprint extends React.Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    sex: "",
    age: "",
    birthdate: "",
    civilStatus: "",
    nationality: "",
    religion: "",
    contactNumber: "",
    guardianName: "",
    relationship: "",
    guardianContactNo: "",
    pastIllness: [],
    famIllness: [],
    height: "",
    weight: "",
    bloodType: "",
    immunization: [],
    hospitalizations: [],
    operations: [],
    medication: [],
    bodyArt: [],
    habits: [],
    visualAcuity: [],
    allergies: [],
    menarchYear: "",
    menarchAge: "",
    dysmennorrhea: "",
    mensDuration: "",
    records: [],
    isHistory: true,
    recordsOnlyID: "",
    allID: ""
  };

  componentDidMount() {
    const { records, view, history } = this.props.medrec;
    this.setState({
      recordsOnlyID: uuid.v4(),
      allID: uuid.v4()
    });
    this.setState({
      firstName: view.firstName,
      middleName: view.middleName,
      lastName: view.lastName,
      sex: view.sex,
      age: view.age,
      birthdate: `${view.birthMonth} ${view.birthDay}, ${view.birthYear}`,
      civilStatus: view.civilStatus,
      nationality: view.nationality,
      religion: view.religion,
      contactNumber: view.contactNumber,
      guardianName: view.guardianName,
      relationship: view.relationship,
      guardianContactNo: view.guardianContactNo,
      records: records
    });
    if (history) {
      this.setState({
        isHistory: false,
        pastIllness: history.pastIllness,
        famIllness: history.famIllness,
        height: history.height,
        weight: history.weight,
        bloodType: history.bloodType,
        immunization: history.immunization,
        hospitalizations: history.hospitalizations,
        allergies: history.allergies,
        bodyArt: history.bodyArt,
        habits: history.habits,
        medication: history.medication,
        operations: history.operations,
        visualAcuity: history.visualAcuity,
        menarchYear: history.menarchYear,
        menarchAge: history.menarchAge,
        dysmennorrhea: history.dysmennorrhea,
        mensDuration: history.mensDuration
      });
    }
  }

  render() {
    const { clinician } = this.props.auth;
    return (
      <div>
        <h2 className="dataDesign">Select what to print</h2>
        <Row>
          <Col>
            <Container style={{ marginTop: "10px" }}>
              <ReactToPrint
                pageStyle="@page {margin: 1in .5in;}"
                trigger={() => (
                  <Button
                    style={{ borderRadius: "50px" }}
                    block
                    color="primary"
                  >
                    <b>Personal Information Only</b>
                  </Button>
                )}
                content={() => this.componentRef}
              />
              <div style={{ display: "none" }}>
                <Fpersonalrecord
                  id={uuid.v4()}
                  today={new Date().toLocaleString("en-PH")}
                  ref={(el) => (this.componentRef = el)}
                  name={`${clinician.firstName} ${clinician.middleName} ${clinician.lastName}`}
                  firstName={this.state.firstName}
                  middleName={this.state.middleName}
                  lastName={this.state.lastName}
                  sex={this.state.sex}
                  age={this.state.age}
                  birthdate={this.state.birthdate}
                  civilStatus={this.state.civilStatus}
                  nationality={this.state.nationality}
                  religion={this.state.religion}
                  contactNumber={this.state.contactNumber}
                  guardianName={this.state.guardianName}
                  relationship={this.state.relationship}
                  guardianContactNo={this.state.guardianContactNo}
                />
              </div>
            </Container>
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <Container>
              <ReactToPrint
                pageStyle="@page {margin: 1in .5in;}"
                trigger={() => (
                  <Button
                    block
                    color="primary"
                    style={{ borderRadius: "50px" }}
                    disabled={this.state.isHistory}
                  >
                    <b>Medical History Only</b>
                  </Button>
                )}
                content={() => this.componentRef1}
              />
              <div style={{ display: "none" }}>
                <Fmedicalhistory
                  ref={(el) => (this.componentRef1 = el)}
                  id={uuid.v4()}
                  today={new Date().toLocaleString("en-PH")}
                  name={`${clinician.firstName} ${clinician.middleName} ${clinician.lastName}`}
                  pastIllness={this.state.pastIllness.map((pastIllness) => (
                    <Row>
                      <Col xs="4" className="bordercolor">
                        {pastIllness.name}
                      </Col>
                      <Col xs="8" className="bordercolor">
                        Remarks:{" "}
                        {pastIllness.remarks === "" ? (
                          <Fragment>None</Fragment>
                        ) : (
                          pastIllness.remarks
                        )}
                      </Col>
                    </Row>
                  ))}
                  famIllness={this.state.famIllness.map((famIllness) => (
                    <Row>
                      <Col xs="4" className="bordercolor">
                        {famIllness.name}
                      </Col>
                      <Col xs="8" className="bordercolor">
                        Remarks:{" "}
                        {famIllness.remarks === "" ? (
                          <Fragment>None</Fragment>
                        ) : (
                          famIllness.remarks
                        )}
                      </Col>
                    </Row>
                  ))}
                  height={this.state.height}
                  weight={this.state.weight}
                  bloodType={this.state.bloodType}
                  immunization={this.state.immunization.map((immunization) => (
                    <Row>
                      <Col className="bordercolor">{immunization.name}</Col>{" "}
                    </Row>
                  ))}
                  hospitalizations={this.state.hospitalizations.map(
                    (hospitalizations) => (
                      <Row className="bordercolor">
                        <div className="divprint">{hospitalizations.entry}</div>
                      </Row>
                    )
                  )}
                  operations={this.state.operations.map((operations) => (
                    <Row className="bordercolor">
                      <div className="divprint">{operations.entry}</div>
                    </Row>
                  ))}
                  medication={this.state.medication.map((medication) => (
                    <Row className="bordercolor">
                      <div className="divprint">{medication.entry}</div>
                    </Row>
                  ))}
                  allergies={this.state.allergies.map((allergies) => (
                    <Row>
                      <Col xs="4" className="bordercolor">
                        {allergies.name}
                      </Col>
                      <Col xs="8" className="bordercolor">
                        Remarks:{" "}
                        {allergies.remarks === "" ? (
                          <Fragment>None</Fragment>
                        ) : (
                          allergies.remarks
                        )}
                      </Col>
                    </Row>
                  ))}
                  bodyArt={this.state.bodyArt.map((bodyArt) => (
                    <Row>
                      <Col xs="4" className="bordercolor">
                        {bodyArt.name}
                      </Col>
                      <Col xs="8" className="bordercolor">
                        Remarks:{" "}
                        {bodyArt.remarks === "" ? (
                          <Fragment>None</Fragment>
                        ) : (
                          bodyArt.remarks
                        )}
                      </Col>
                    </Row>
                  ))}
                  habits={this.state.habits.map((habits) => (
                    <Row>
                      <Col xs="4" className="bordercolor">
                        {habits.name}
                      </Col>
                      <Col xs="8" className="bordercolor">
                        Remarks:{" "}
                        {habits.remarks === "" ? (
                          <Fragment>None</Fragment>
                        ) : (
                          habits.remarks
                        )}
                      </Col>
                    </Row>
                  ))}
                  visualAcuity={this.state.visualAcuity.map((visualAcuity) => (
                    <Row>
                      <Col xs="3" className="bordercolor">
                        {visualAcuity.name}
                      </Col>
                      <Col xs="3" className="bordercolor">
                        OD: {visualAcuity.od}
                      </Col>
                      <Col xs="3" className="bordercolor">
                        OS: {visualAcuity.os}
                      </Col>
                      <Col xs="3" className="bordercolor">
                        Date {visualAcuity.date}
                      </Col>
                    </Row>
                  ))}
                  menarchYear={this.state.menarchYear}
                  menarchAge={this.state.menarchAge}
                  mensDuration={this.state.mensDuration}
                  dysmennorrhea={this.state.dysmennorrhea}
                  sex={this.state.sex}
                />
              </div>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "10px" }}>
            <Container>
              <ReactToPrint
                pageStyle="@page {margin: 1in .5in;}"
                trigger={() => (
                  <Button
                    block
                    color="primary"
                    style={{ borderRadius: "50px" }}
                    disabled={this.state.records.length === 0}
                  >
                    <b>Consultation Records Only</b>
                  </Button>
                )}
                content={() => this.componentRef2}
              />

              <div style={{ display: "none" }}>
                <Fmedicalrecords
                  ref={(el) => (this.componentRef2 = el)}
                  records={this.state.records.map((record) => (
                    <main>
                      <Row className="bordercolor">
                        <Col className="center1">
                          <h2>CONSULTATION RECORDS</h2>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h5>
                            <b>Physical Examination Findings </b>
                          </h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="bordercolor" xs="2">
                          <h5>
                            <b>Vital Signs </b>
                          </h5>
                        </Col>
                        <Col className="bordercolor" xs="5">
                          <Col>Blood Pressure: {record.bloodPressure}</Col>
                          <Col>Pulse Rate: {record.pulseRate}</Col>
                        </Col>
                        <Col className="bordercolor" xs="5">
                          <Col>Respiratory Rate: {record.respiratoryRate}</Col>
                          <Col>Temperature: {record.temperature}</Col>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="bordercolor">
                          <h5>
                            <b>Physical Examination</b>
                          </h5>
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
                              <div className="divprint">{record.heent}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.heart}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Lungs
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Abdomen
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.lungs}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.abdomen}</div>
                            </Col>
                            <Col className="bordercolor" xs="12">
                              Extremities
                            </Col>
                            <Col className="bordercolor" xs="12">
                              <div className="divprint1">
                                {record.extremities}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="bordercolor">
                          <h5>
                            <b>Laboratory Workups</b>
                          </h5>
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
                                {record.completeBloodCount}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {record.urinalysis}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Fecalysis
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Chest X-ray(CXR)
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.fecalysis}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.chestXray}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Ishihara Test
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Audio
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {record.isihiraTest}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.audio}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Psychological Exam
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Drug Test
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {record.psychologicalExam}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.drugTest}</div>
                            </Col>
                            <Col className="bordercolor" xs="12">
                              Hepatitis B Test
                            </Col>
                            <Col className="bordercolor" xs="12">
                              <div className="divprint1">
                                {record.hepatitisBTest}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h5>
                            <b>Complaints </b>
                          </h5>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">{record.complaints}</div>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h5>
                            <b>Diagnosis </b>
                          </h5>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">{record.diagnosis}</div>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h5>
                            <b>Treatment </b>
                          </h5>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">{record.treatment}</div>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h5>
                            <b>Remarks </b>
                          </h5>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">{record.remarks}</div>
                      </Row>
                      <div class="divFooter">
                        Medical Record ID: {this.state.recordsOnlyID}
                      </div>
                      <div class="divFooter">
                        Generated by:{" "}
                        {`${clinician.firstName} ${clinician.middleName} ${clinician.lastName}`}
                      </div>
                      <div class="divFooter">
                        Date & Time: {new Date().toLocaleString("en-PH")}
                      </div>
                    </main>
                  ))}
                />
              </div>
            </Container>
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <Container>
              <ReactToPrint
                pageStyle="@page {margin: 1in .5in;}"
                trigger={() => (
                  <Button
                    block
                    color="primary"
                    style={{ borderRadius: "50px" }}
                  >
                    <b>Entire Medical Record</b>
                  </Button>
                )}
                content={() => this.componentRef3}
              />

              <div style={{ display: "none" }}>
                <FAllmedical
                  ref={(el) => (this.componentRef3 = el)}
                  id={this.state.allID}
                  today={new Date().toLocaleString("en-PH")}
                  name={`${clinician.firstName} ${clinician.middleName} ${clinician.lastName}`}
                  firstName={this.state.firstName}
                  middleName={this.state.middleName}
                  lastName={this.state.lastName}
                  sex={this.state.sex}
                  age={this.state.age}
                  birthdate={this.state.birthdate}
                  civilStatus={this.state.civilStatus}
                  nationality={this.state.nationality}
                  religion={this.state.religion}
                  contactNumber={this.state.contactNumber}
                  guardianName={this.state.guardianName}
                  relationship={this.state.relationship}
                  guardianContactNo={this.state.guardianContactNo}
                  records={this.state.records.map((record) => (
                    <main>
                      <Row className="bordercolor">
                        <Col className="center1">
                          <h3>CONSULTATION RECORDS</h3>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h5>
                            <b>Physical Examination Findings </b>
                          </h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="bordercolor" xs="2">
                          <h5>
                            <b>Vital Signs </b>
                          </h5>
                        </Col>
                        <Col className="bordercolor" xs="5">
                          <Col>Blood Pressure: {record.bloodPressure}</Col>
                          <Col>Pulse Rate: {record.pulseRate}</Col>
                        </Col>
                        <Col className="bordercolor" xs="5">
                          <Col>Respiratory Rate: {record.respiratoryRate}</Col>
                          <Col>Temperature: {record.temperature}</Col>
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
                              <div className="divprint">{record.heent}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.heart}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Lungs
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Abdomen
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.lungs}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.abdomen}</div>
                            </Col>
                            <Col className="bordercolor" xs="12">
                              Extremities
                            </Col>
                            <Col className="bordercolor" xs="12">
                              <div className="divprint1">
                                {record.extremities}
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
                                {record.completeBloodCount}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {record.urinalysis}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Fecalysis
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Chest X-ray(CXR)
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.fecalysis}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.chestXray}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Ishihara Test
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Audio
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {record.isihiraTest}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.audio}</div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Psychological Exam
                            </Col>
                            <Col className="bordercolor" xs="6">
                              Drug Test
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">
                                {record.psychologicalExam}
                              </div>
                            </Col>
                            <Col className="bordercolor" xs="6">
                              <div className="divprint">{record.drugTest}</div>
                            </Col>
                            <Col className="bordercolor" xs="12">
                              Hepatitis B Test
                            </Col>
                            <Col className="bordercolor" xs="12">
                              <div className="divprint1">
                                {record.hepatitisBTest}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h5>
                            <b>Complaints </b>
                          </h5>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">{record.complaints}</div>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h5>
                            <b>Diagnosis </b>
                          </h5>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">{record.diagnosis}</div>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h5>
                            <b>Treatment </b>
                          </h5>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">{record.treatment}</div>
                      </Row>
                      <Row className="bordercolor">
                        <Col>
                          <h5>
                            <b>Remarks </b>
                          </h5>
                        </Col>
                      </Row>
                      <Row className="bordercolor">
                        <div className="divprint">{record.remarks}</div>
                      </Row>
                      <div class="divFooter">
                        Medical Record ID: {this.state.allID}
                      </div>
                      <div class="divFooter">
                        Generated by:{" "}
                        {`${clinician.firstName} ${clinician.middleName} ${clinician.lastName}`}
                      </div>

                      <div class="divFooter">
                        Date & Time: {new Date().toLocaleString("en-PH")}
                      </div>
                    </main>
                  ))}
                  isHistory={this.state.isHistory}
                  pastIllness={this.state.pastIllness.map((pastIllness) => (
                    <Row>
                      <Col xs="4" className="bordercolor">
                        {pastIllness.name}
                      </Col>
                      <Col xs="8" className="bordercolor">
                        Remarks:{" "}
                        {pastIllness.remarks === "" ? (
                          <Fragment>None</Fragment>
                        ) : (
                          pastIllness.remarks
                        )}
                        >
                      </Col>
                    </Row>
                  ))}
                  famIllness={this.state.famIllness.map((famIllness) => (
                    <Row>
                      <Col xs="4" className="bordercolor">
                        {famIllness.name}
                      </Col>
                      <Col xs="8" className="bordercolor">
                        Remarks:{" "}
                        {famIllness.remarks === "" ? (
                          <Fragment>None</Fragment>
                        ) : (
                          famIllness.remarks
                        )}
                      </Col>
                    </Row>
                  ))}
                  height={this.state.height}
                  weight={this.state.weight}
                  bloodType={this.state.bloodType}
                  immunization={this.state.immunization.map((immunization) => (
                    <Row>
                      <Col className="bordercolor">{immunization.name}</Col>
                    </Row>
                  ))}
                  hospitalizations={this.state.hospitalizations.map(
                    (hospitalizations) => (
                      <Row className="bordercolor">
                        <div className="divprint">{hospitalizations.entry}</div>
                      </Row>
                    )
                  )}
                  operations={this.state.operations.map((operations) => (
                    <Row className="bordercolor">
                      <div className="divprint">{operations.entry}</div>
                    </Row>
                  ))}
                  medication={this.state.medication.map((medication) => (
                    <Row className="bordercolor">
                      <div className="divprint">{medication.entry}</div>
                    </Row>
                  ))}
                  allergies={this.state.allergies.map((allergies) => (
                    <Row>
                      <Col xs="4" className="bordercolor">
                        {allergies.name}
                      </Col>
                      <Col xs="8" className="bordercolor">
                        Remarks:{" "}
                        {allergies.remarks === "" ? (
                          <Fragment>None</Fragment>
                        ) : (
                          allergies.remarks
                        )}
                      </Col>
                    </Row>
                  ))}
                  bodyArt={this.state.bodyArt.map((bodyArt) => (
                    <Row>
                      <Col xs="4" className="bordercolor">
                        {bodyArt.name}
                      </Col>
                      <Col xs="8" className="bordercolor">
                        Remarks:{" "}
                        {bodyArt.remarks === "" ? (
                          <Fragment>None</Fragment>
                        ) : (
                          bodyArt.remarks
                        )}
                      </Col>
                    </Row>
                  ))}
                  habits={this.state.habits.map((habits) => (
                    <Row>
                      <Col xs="4" className="bordercolor">
                        {habits.name}
                      </Col>
                      <Col xs="8" className="bordercolor">
                        Remarks:{" "}
                        {habits.remarks === "" ? (
                          <Fragment>None</Fragment>
                        ) : (
                          habits.remarks
                        )}
                      </Col>
                    </Row>
                  ))}
                  visualAcuity={this.state.visualAcuity.map((visualAcuity) => (
                    <Row>
                      <Col xs="3" className="bordercolor">
                        {visualAcuity.name}
                      </Col>
                      <Col xs="3" className="bordercolor">
                        OD: {visualAcuity.od}
                      </Col>
                      <Col xs="3" className="bordercolor">
                        OS: {visualAcuity.os}
                      </Col>
                      <Col xs="3" className="bordercolor">
                        Date {visualAcuity.date}
                      </Col>
                    </Row>
                  ))}
                  menarchYear={this.state.menarchYear}
                  menarchAge={this.state.menarchAge}
                  mensDuration={this.state.mensDuration}
                  dysmennorrhea={this.state.dysmennorrhea}
                />
              </div>
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  medrec: state.medrec
});

export default connect(mapStateToProps, { allRecords })(Fprint);
