import React from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";

class Fmedicalrecords extends React.Component {
  render() {
    return this.props.medrec.record !== null ? (
      <div className="paging">
        <Container className="bordercolor3">
          <Row className="bordercolor">
            <Col className="center1">
              <h2>CONSULTATION RECORDS</h2>
            </Col>
          </Row>
          <Row className="bordercolor">
            <Col>
              <b>Physical Examination Findings</b>
            </Col>
          </Row>
          <Row>
            <Col className="bordercolor" xs="2">
              <b>Vital Signs</b>
            </Col>
            <Col className="bordercolor" xs="5">
              <Col>
                Blood Pressure: {this.props.medrec.record.bloodPressure}
              </Col>
              <Col>Pulse Rate: {this.props.medrec.record.pulseRate}</Col>
            </Col>
            <Col className="bordercolor" xs="5">
              <Col>
                Respiratory Rate: {this.props.medrec.record.respiratoryRate}
              </Col>
              <Col>Temperature: {this.props.medrec.record.temperature}</Col>
            </Col>
          </Row>
          <Row>
            <Col className="bordercolor">
              <b>Physical Examination</b>
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
                  <div className="divprint">
                    {this.props.medrec.record.extremities}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="bordercolor">
              <b>Laboratory Workups</b>
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
                  <div className="divprint">
                    {this.props.medrec.record.hepatitisBTest}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="bordercolor">
            <Col>
              <b>Complaints</b>
            </Col>
          </Row>
          <Row className="bordercolor">
            <div className="divprint">
              {this.props.medrec.record.complaints}
            </div>
          </Row>
          <Row className="bordercolor">
            <Col>
              <b>Diagnosis</b>
            </Col>
          </Row>
          <Row className="bordercolor">
            <div className="divprint">{this.props.medrec.record.diagnosis}</div>
          </Row>
          <Row className="bordercolor">
            <Col>
              <b>Treatment</b>
            </Col>
          </Row>
          <Row className="bordercolor">
            <div className="divprint">{this.props.medrec.record.treatment}</div>
          </Row>
          <Row className="bordercolor">
            <Col>
              <b>Remarks</b>
            </Col>
          </Row>
          <Row className="bordercolor">
            <div className="divprint">{this.props.medrec.record.remarks}</div>
          </Row>
        </Container>
      </div>
    ) : null;
  }
}
const mapStateToProps = (state) => ({
  medrec: state.medrec
});

export default connect(mapStateToProps, null)(Fmedicalrecords);
