import React, { Fragment } from "react";
import { Row, Col, Container, Label } from "reactstrap";
import { connect } from "react-redux";
import uuid from "uuid";

class Fmedicalhistory extends React.Component {
  render() {
    const { view } = this.props.medrec;
    return this.props.medrec.medHis !== null ? (
      <div className="paging">
        <Container className="bordercolor3">
          <Row className="bordercolor">
            <Col className="center1">
              <h3>MEDICAL HISTORY</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row className="bordercolor">
                <Col>
                  <h6>History of past Illness</h6>
                </Col>
              </Row>
              <div className="divprint2">
                {this.props.medrec.medHis.pastIllness.map((pastIllness) => (
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
                ))}
              </div>
            </Col>
          </Row>{" "}
          <Row>
            <Col>
              <Row className="bordercolor">
                <Col>
                  <h6>Family History of Illness</h6>
                </Col>
              </Row>
              <div className="divprint2">
                {this.props.medrec.medHis.famIllness.map((famIllness) => (
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
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="bordercolor">
              Height(cm): {this.props.medrec.medHis.height}
            </Col>
            <Col className="bordercolor">
              Weight(kg): {this.props.medrec.medHis.weight}
            </Col>
            <Col className="bordercolor">
              Blood Type: {this.props.medrec.medHis.bloodType}
            </Col>
          </Row>
          <Row className="bordercolor">
            <Col>
              <h6>Immunization</h6>
            </Col>
          </Row>
          {this.props.medrec.medHis.immunization.map((immunization) => (
            <Row>
              <Col xs="4" className="bordercolor">
                {immunization.name}
              </Col>{" "}
              <Col className="bordercolor"></Col>
            </Row>
          ))}
          <Row className="bordercolor">
            <Col>
              <h6>Hospitalization</h6>
            </Col>
          </Row>
          {this.props.medrec.medHis.hospitalizations.map((hospitalizations) => (
            <Row className="bordercolor">
              <div className="divprint">{hospitalizations.entry}</div>
            </Row>
          ))}
          <Row className="bordercolor">
            <Col>
              <h6>Operation</h6>
            </Col>
          </Row>
          {this.props.medrec.medHis.operations.map((operations) => (
            <Row className="bordercolor">
              <div className="divprint">{operations.entry}</div>
            </Row>
          ))}
          <Row className="bordercolor">
            <Col>
              <h6>Medical History</h6>
            </Col>
          </Row>
          {this.props.medrec.medHis.medication.map((medication) => (
            <Row className="bordercolor">
              <div className="divprint">{medication.entry}</div>
            </Row>
          ))}
          <Row className="bordercolor">
            <Col>
              <h6>Allergies</h6>
            </Col>
          </Row>
          {this.props.medrec.medHis.allergies.map((allergies) => (
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
          ))}
          <Row className="bordercolor">
            <Col>
              <h6>Body Art</h6>
            </Col>
          </Row>
          {this.props.medrec.medHis.bodyArt.map((bodyArt) => (
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
          ))}
          <Row className="bordercolor">
            <Col>
              <h6>Pertubing Habit</h6>
            </Col>
          </Row>
          {this.props.medrec.medHis.habits.map((habits) => (
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
          <Row className="bordercolor">
            <Col>
              <h6>Visual Acuity</h6>
            </Col>
          </Row>
          {this.props.medrec.medHis.visualAcuity.map((visualAcuity) => (
            <Row>
              <Col xs="4" className="bordercolor">
                {visualAcuity.name}
              </Col>
              <Col className="bordercolor">OD: {visualAcuity.od}</Col>
              <Col className="bordercolor">OS: {visualAcuity.os}</Col>
              <Col className="bordercolor">Date {visualAcuity.date}</Col>
            </Row>
          ))}
          {this.props.medrec.view.sex === "Female" ? (
            <Fragment>
              {" "}
              <Row className="bordercolor">
                <Col>
                  <h6>O.B Gyne History</h6>
                </Col>
              </Row>
              <Row>
                <Col className="bordercolor" xs="7">
                  Menach Year: {this.props.medrec.medHis.menarchYear}
                </Col>
                <Col className="bordercolor" xs="5">
                  Menach Age: {this.props.medrec.medHis.menarchAge}
                </Col>
                <Col className="bordercolor" xs="7">
                  Menstruation Duration: {this.props.medrec.medHis.mensDuration}
                </Col>
                <Col className="bordercolor" xs="5">
                  Dysmenorrhea: {this.props.medrec.medHis.dysmennorrhea}
                </Col>
              </Row>
              <div class="divFooter">Medical Record ID: {uuid.v4()}</div>
              <div class="divFooter">
                Generated by:{" "}
                {`${view.firstName} ${view.middleName} ${view.lastName}`}
              </div>
              <div class="divFooter">
                Date & Time: {new Date().toLocaleString("en-PH")}
              </div>
            </Fragment>
          ) : null}
        </Container>
      </div>
    ) : null;
  }
}
const mapStateToProps = (state) => ({
  medrec: state.medrec
});

export default connect(mapStateToProps, null)(Fmedicalhistory);
