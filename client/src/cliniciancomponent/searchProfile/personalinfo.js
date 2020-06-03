import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { view } from "../../actions/blockchainActions";

class PersonalInfo extends React.Component {
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

  render() {
    const { view } = this.props.medrec;

    return (
      <Container>
        <div className="position">
          <h2 className="floater-left1 dataDesign">Personal Information</h2>
        </div>
        <Container className="floater-left1">
          <Row style={{ padding: "4px 0px 4px 0px" }}>
            <Col sm={2}>Name</Col>
            <Col sm={10} className="dataDesign">
              {`${view.firstName} ${view.middleName} ${view.lastName}`}
            </Col>
          </Row>
          <Row style={{ padding: "4px 0px 4px 0px" }}>
            <Col sm={2}>Birthdate</Col>
            <Col sm={10} className="dataDesign">
              {`${view.birthMonth} ${view.birthDay}, ${view.birthYear}`}
            </Col>
          </Row>
          <Row style={{ padding: "4px 0px 4px 0px" }}>
            <Col sm={2}>Age</Col>
            <Col sm={10} className="dataDesign">{`${view.age} y/o`}</Col>
          </Row>
          <Row style={{ padding: "4px 0px 4px 0px" }}>
            <Col sm={2}>Sex</Col>
            <Col sm={10} className="dataDesign">{`${view.sex}`}</Col>
          </Row>
          <Row style={{ padding: "4px 0px 4px 0px" }}>
            <Col sm={2}>Address</Col>
            <Col sm={10} className="dataDesign">{`${view.address}`}</Col>
          </Row>
          <Row style={{ padding: "4px 0px 4px 0px" }}>
            <Col sm={2}>Nationality</Col>
            <Col sm={10} className="dataDesign">{`${view.nationality}`}</Col>
          </Row>
          <Row style={{ padding: "4px 0px 4px 0px" }}>
            <Col sm={2}>Civil Status</Col>
            <Col sm={10} className="dataDesign">{`${view.civilStatus}`}</Col>
          </Row>
          <Row style={{ padding: "4px 0px 4px 0px" }}>
            <Col sm={2}>Religion</Col>
            <Col sm={10} className="dataDesign">{`${view.religion}`}</Col>
          </Row>
          <Row style={{ padding: "4px 0px 4px 0px" }}>
            <Col sm={2}>Contact No.</Col>
            <Col sm={10} className="dataDesign">{`${view.contactNumber}`}</Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  medrec: state.medrec
});

export default connect(mapStateToProps, { view })(PersonalInfo);
