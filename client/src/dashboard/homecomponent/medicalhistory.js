import React, { Fragment } from "react";
import { Row, Col, Container, Label } from "reactstrap";
import { connect } from "react-redux";

class Medicalhistory extends React.Component {
  render() {
    const { medHis } = this.props.medrec;
    if (this.props.medrec.medHis !== null) {
      return (
        <Container className="bgDesign">
          <Container className="medhis">
            <Row>
              <Col>
                <Label>
                  <h5>History of Past Illness</h5>
                </Label>
                <Container className="medic1">
                  {medHis.pastIllness.length !== 0 ? (
                    <Fragment>
                      {medHis.pastIllness.map(({ name, remarks }, index) => (
                        <Row style={{ padding: "5px 5px 0px 0px" }} key={index}>
                          <Col md={5}>
                            <span className="dataDesign">{name}</span>
                          </Col>
                          {remarks ? (
                            <Col style={{ wordBreak: "break-word" }}>
                              <div className="rmDesign">{remarks}</div>
                            </Col>
                          ) : null}
                        </Row>
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Row style={{ padding: "5px 5px 0px 0px" }}>
                        <Col>
                          <span className="dataDesign">None</span>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </Container>
              </Col>
              <Col>
                <Label>
                  <h5>Family History of Illness</h5>
                </Label>
                <Container className="medic1">
                  {medHis.famIllness.length !== 0 ? (
                    <Fragment>
                      {medHis.famIllness.map(({ name, remarks }, index) => (
                        <Row style={{ padding: "5px 5px 0px 0px" }} key={index}>
                          <Col md={5}>
                            <span className="dataDesign">{name}</span>
                          </Col>
                          {remarks ? (
                            <Col style={{ wordBreak: "break-word" }}>
                              <div className="rmDesign">{remarks}</div>
                            </Col>
                          ) : null}
                        </Row>
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Row style={{ padding: "5px 5px 0px 0px" }}>
                        <Col>
                          <span className="dataDesign">None</span>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </Container>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <Col md={4}>
                <Row>
                  <Col md={5}>Height (cm)</Col>
                  <Col>
                    <span className="dataDesign">
                      {`${medHis.height ? medHis.height : "N/A"}`}
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={5}>Weight (kg)</Col>
                  <Col>
                    <span className="dataDesign">{`${
                      medHis.weight ? medHis.weight : "N/A"
                    }`}</span>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={5}>Blood Type</Col>
                  <Col>
                    <span className="dataDesign">{`${
                      medHis.bloodType ? medHis.bloodType : "N/A"
                    }`}</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            {this.props.auth.patient.sex === "Female" ? (
              <Row style={{ paddingTop: "20px" }}>
                <Col md={3}>
                  <Col>
                    <Row md={5}>Menarch Year</Row>
                    <Row>
                      <span className="dataDesign">{`${
                        medHis.menarchYear ? medHis.menarchYear : "N/A"
                      }`}</span>
                    </Row>
                  </Col>
                </Col>
                <Col md={3}>
                  <Col>
                    <Row md={5}>Menarch Age</Row>
                    <Row>
                      <span className="dataDesign">{`${
                        medHis.menarchAge ? medHis.menarchAge : "N/A"
                      }`}</span>
                    </Row>
                  </Col>
                </Col>
                <Col md={3}>
                  <Col>
                    <Row md={5}>Menstruation Duration</Row>
                    <Row>
                      <span className="dataDesign">{`${
                        medHis.mensDuration ? medHis.mensDuration : "N/A"
                      }`}</span>
                    </Row>
                  </Col>
                </Col>
                <Col md={3}>
                  <Col>
                    <Row md={5}>Dysmennorrhea</Row>
                    <Row>
                      <span className="dataDesign">
                        {`${
                          medHis.dysmennorrhea ? medHis.dysmennorrhea : "N/A"
                        }`}
                      </span>
                    </Row>
                  </Col>
                </Col>
              </Row>
            ) : null}
            <Row style={{ paddingTop: "20px" }}>
              <Col md={6}>
                <Label>
                  <h5>Immunization</h5>
                </Label>
                <Container>
                  {medHis.immunization.length !== 0 ? (
                    <Row style={{ padding: "5px 5px 0px 0px" }}>
                      {medHis.immunization.map(({ name }, index) => (
                        <Col
                          md={6}
                          style={{ padding: "5px 0px 5px 0px" }}
                          key={index}
                        >
                          <span className="dataDesign">{name}</span>
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <Row style={{ padding: "5px 5px 0px 0px" }}>
                      <Col>
                        <span className="dataDesign">None</span>
                      </Col>
                    </Row>
                  )}
                </Container>
              </Col>
              <Col>
                <Label>
                  <h5>Allergies</h5>
                </Label>
                <Container className="medic1">
                  {medHis.allergies.length !== 0 ? (
                    <Fragment>
                      {medHis.allergies.map(({ name, remarks }, index) => (
                        <Row style={{ padding: "5px 5px 0px 0px" }} key={index}>
                          <Col md={5}>
                            <span className="dataDesign">{name}</span>
                          </Col>
                          {remarks ? (
                            <Col style={{ wordBreak: "break-word" }}>
                              <div className="rmDesign">{remarks}</div>
                            </Col>
                          ) : null}
                        </Row>
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Row style={{ padding: "5px 5px 0px 0px" }}>
                        <Col>
                          <span className="dataDesign">None</span>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </Container>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <Col>
                <Label>
                  <h5>Hospitalization</h5>
                </Label>
                <Container className="medic1">
                  {medHis.hospitalizations.length !== 0 ? (
                    <Fragment>
                      {medHis.hospitalizations.map(({ id, entry }) => (
                        <Row style={{ padding: "5px 5px 0px 0px" }} key={id}>
                          <Col style={{ wordBreak: "break-word" }}>
                            <div className="rmDesign">{entry}</div>
                          </Col>
                        </Row>
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Row style={{ padding: "5px 5px 0px 0px" }}>
                        <Col>
                          <span className="dataDesign">None</span>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </Container>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <Col>
                <Label>
                  <h5>Operations</h5>
                </Label>
                <Container className="medic1">
                  {medHis.operations.length !== 0 ? (
                    <Fragment>
                      {medHis.operations.map(({ id, entry }) => (
                        <Row style={{ padding: "5px 5px 0px 0px" }} key={id}>
                          <Col style={{ wordBreak: "break-word" }}>
                            <div className="rmDesign">{entry}</div>
                          </Col>
                        </Row>
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Row style={{ padding: "5px 5px 0px 0px" }}>
                        <Col>
                          <span className="dataDesign">None</span>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </Container>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <Col>
                <Label>
                  <h5>Medication</h5>
                </Label>
                <Container className="medic1">
                  {medHis.medication.length !== 0 ? (
                    <Fragment>
                      {medHis.medication.map(({ id, entry }) => (
                        <Row style={{ padding: "5px 5px 0px 0px" }} key={id}>
                          <Col style={{ wordBreak: "break-word" }}>
                            <div className="rmDesign">{entry}</div>
                          </Col>
                        </Row>
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Row style={{ padding: "5px 5px 0px 0px" }}>
                        <Col>
                          <span className="dataDesign">None</span>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </Container>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <Col>
                <Label>
                  <h5>Body Art</h5>
                </Label>
                <Container>
                  {medHis.bodyArt.length !== 0 ? (
                    <Fragment>
                      {medHis.bodyArt.map(({ name, remarks }, index) => (
                        <Row style={{ padding: "5px 5px 0px 0px" }} key={index}>
                          <Col md={5}>
                            <span className="dataDesign">{name}</span>
                          </Col>
                          {remarks ? (
                            <Col style={{ wordBreak: "break-word" }}>
                              <div className="rmDesign">{remarks}</div>
                            </Col>
                          ) : null}
                        </Row>
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Row style={{ padding: "5px 5px 0px 0px" }}>
                        <Col>
                          <span className="dataDesign">None</span>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </Container>
              </Col>
              <Col>
                <Label>
                  <h5>Pertubing Habits</h5>
                </Label>
                <Container>
                  {medHis.habits.length !== 0 ? (
                    <Fragment>
                      {medHis.habits.map(({ name, remarks }, index) => (
                        <Row style={{ padding: "5px 5px 0px 0px" }} key={index}>
                          <Col md={5}>
                            <span className="dataDesign">{name}</span>
                          </Col>
                          {remarks ? (
                            <Col style={{ wordBreak: "break-word" }}>
                              <div className="rmDesign">{remarks}</div>
                            </Col>
                          ) : null}
                        </Row>
                      ))}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Row style={{ padding: "5px 5px 0px 0px" }}>
                        <Col>
                          <span className="dataDesign">None</span>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </Container>
              </Col>
            </Row>
            <Row style={{ paddingTop: "20px" }}>
              <Col>
                <Label>
                  <h5>Visual Acuity</h5>
                </Label>
                <Container>
                  {medHis.visualAcuity.length !== 0 ? (
                    <Fragment>
                      {medHis.visualAcuity.map(
                        ({ name, od, os, date }, index) => (
                          <Row
                            style={{ padding: "5px 5px 0px 0px" }}
                            key={index}
                          >
                            <Col
                              md={3}
                              style={{
                                marginTop: "auto",
                                marginBottom: "auto"
                              }}
                            >
                              <span className="dataDesign">{name}</span>
                            </Col>
                            <Col
                              md={2}
                              style={{
                                wordBreak: "break-word",
                                margin: "3px 3px"
                              }}
                            >
                              <Row>OD</Row>
                              <Row>
                                <div className="rmDesign">
                                  {`${od ? od : "N/A"}`}
                                </div>
                              </Row>
                            </Col>
                            <Col
                              md={2}
                              style={{
                                wordBreak: "break-word",
                                margin: "3px 3px"
                              }}
                            >
                              <Row>OS</Row>
                              <Row>
                                <div className="rmDesign">
                                  {`${os ? os : "N/A"}`}
                                </div>
                              </Row>
                            </Col>
                            <Col
                              md={2}
                              style={{
                                wordBreak: "break-word",
                                margin: "3px 3px"
                              }}
                            >
                              <Row>Date</Row>
                              <Row>
                                <div className="rmDesign">
                                  {`${date ? date : "N/A"}`}
                                </div>
                              </Row>
                            </Col>
                          </Row>
                        )
                      )}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Row style={{ padding: "5px 5px 0px 0px" }}>
                        <Col>
                          <span className="dataDesign">None</span>
                        </Col>
                      </Row>
                    </Fragment>
                  )}
                </Container>
              </Col>
            </Row>
          </Container>
        </Container>
      );
    } else {
      return (
        <Container className="bgDesign">
          <Row>
            <Col
              style={{
                textAlign: "center",
                marginBottom: "506px"
              }}
              className="dataDesign"
            >
              No Medical History
            </Col>
          </Row>
        </Container>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  medrec: state.medrec
});

export default connect(mapStateToProps, null)(Medicalhistory);
