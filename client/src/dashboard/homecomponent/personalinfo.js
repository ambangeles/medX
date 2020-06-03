import React from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

class Personalinfo extends React.Component {
  render() {
    const { patient } = this.props.auth;
    return (
      <Container style={{ height: "550px" }} className="bgDesign">
        <Row>
          <Col>
            <Row style={{ padding: "0px 0px 15px 20px" }}>
              <Col sm={4}>Name</Col>{" "}
              <Col sm={8}>
                <span className="dataDesign">{`${patient.firstName} ${patient.middleName} ${patient.lastName}`}</span>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row style={{ padding: "0px 0px 15px 20px" }}>
              <Col sm={4}>Civil Status</Col>{" "}
              <Col sm={8}>
                <span className="dataDesign">{`${patient.civilStatus}`}</span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row style={{ padding: "0px 0px 15px 20px" }}>
              <Col sm={4}>Birthdate</Col>
              <Col sm={8}>
                <span className="dataDesign">
                  {`${patient.birthMonth} ${patient.birthDay}, ${patient.birthYear}`}
                </span>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row style={{ padding: "0px 0px 15px 20px" }}>
              <Col sm={4}>Nationality </Col>{" "}
              <Col sm={8}>
                <span className="dataDesign">
                  {`${patient.nationality ? patient.nationality : "N/A"}`}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row style={{ padding: "0px 0px 15px 20px" }}>
              <Col sm={4}>Age</Col>
              <Col sm={8}>
                <span className="dataDesign">{`${patient.age} y/o`}</span>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row style={{ padding: "0px 0px 15px 20px" }}>
              <Col sm={4}>Religion</Col>{" "}
              <Col sm={8}>
                <span className="dataDesign">
                  {`${patient.religion ? patient.religion : "N/A"}`}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row style={{ padding: "0px 0px 15px 20px" }}>
              <Col sm={4}>Sex</Col>
              <Col sm={8}>
                <span className="dataDesign">{`${patient.sex}`}</span>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row style={{ padding: "0px 0px 15px 20px" }}>
              <Col sm={4}>Contact No.</Col>{" "}
              <Col sm={8}>
                <span className="dataDesign">
                  {`${patient.contactNumber ? patient.contactNumber : "N/A"}`}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row style={{ padding: "0px 0px 15px 20px" }}>
              <Col sm={2}>Address</Col>
              <Col sm={10}>
                <span className="dataDesign">
                  {`${patient.address ? patient.address : "N/A"}`}
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="margin-10"></Col>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <h4 className="dataDesign">IN CASE OF EMERGENCY</h4>
        </Row>
        <Row>
          <Col md={4} style={{ padding: "0px 0px 0px 50px" }}>
            <Row>Guardian Name</Row>
            <Row>
              <span className="dataDesign">
                {`${patient.guardianName ? patient.guardianName : "N/A"}`}
              </span>
            </Row>
          </Col>
          <Col md={4} style={{ padding: "0px 0px 0px 50px" }}>
            <Row>Relationship</Row>
            <Row>
              <span className="dataDesign">
                {`${patient.relationship ? patient.relationship : "N/A"}`}
              </span>
            </Row>
          </Col>
          <Col md={4} style={{ padding: "0px 0px 0px 50px" }}>
            <Row>Contact No.</Row>
            <Row>
              <span className="dataDesign">
                {`${
                  patient.guardianContactNo ? patient.guardianContactNo : "N/A"
                }`}
              </span>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Personalinfo);
