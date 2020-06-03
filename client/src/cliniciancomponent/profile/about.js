import React from "react";
import { Container, Row, Col, NavLink } from "reactstrap";
import { MdModeEdit } from "react-icons/md";
import EditAbout from "./editabout";
import { connect } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const About = (props) => {
  const { clinician } = props.auth;
  return (
    <Container>
      <div className="position">
        <h2 className="floater-left1 dataDesign">About</h2>
        <NavLink href="/editabout" className="floater-right1">
          <MdModeEdit size="25px" />
          Edit
        </NavLink>
      </div>

      <Container style={{ height: "288px" }} className="floater-left1">
        <Row style={{ padding: "4px 0px 4px 0px" }}>
          <Col sm={2}>Name</Col>
          <Col sm={10} className="dataDesign">
            {`${clinician.firstName} ${clinician.middleName} ${clinician.lastName}`}
          </Col>
        </Row>
        <Row style={{ padding: "4px 0px 4px 0px" }}>
          <Col sm={2}>Birthdate</Col>
          <Col sm={10} className="dataDesign">
            {`${clinician.birthMonth} ${clinician.birthDay}, ${clinician.birthYear}`}
          </Col>
        </Row>
        <Row style={{ padding: "4px 0px 4px 0px" }}>
          <Col sm={2}>Age</Col>
          <Col sm={10} className="dataDesign">
            {`${clinician.age} y/o`}
          </Col>
        </Row>
        <Row style={{ padding: "4px 0px 4px 0px" }}>
          <Col sm={2}>Sex</Col>
          <Col sm={10} className="dataDesign">
            {`${clinician.sex}`}
          </Col>
        </Row>
        <Row style={{ padding: "4px 0px 4px 0px" }}>
          <Col sm={2}>Contact No.</Col>
          <Col sm={10} className="dataDesign">
            {clinician.contactNumber ? clinician.contactNumber : "N/A"}
          </Col>
        </Row>
      </Container>
      <Router>
        <Switch>
          <Route exact path="/editabout" component={EditAbout} />
        </Switch>
      </Router>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(About);
