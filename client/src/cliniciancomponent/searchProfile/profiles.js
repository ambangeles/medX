import React from "react";
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col
} from "reactstrap";
import { IoMdPerson, IoIosMale, IoIosFemale } from "react-icons/io";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PersonalInfo from "../../cliniciancomponent/searchProfile/personalinfo";
import MedicalHistory from "./medicalhistory";
import Records from "./records";
import { connect } from "react-redux";
import {
  view,
  firstHistory,
  allCRecords,
  share
} from "../../actions/blockchainActions";
import Printmodal from "./printmodal";

class Profile extends React.Component {
  state = {
    canPrint: null,
    canInsert: null,
    collapsed: false
  };

  componentDidMount() {
    const {
      permissions,
      viewId,
      shareToken,
      medHisId,
      view
    } = this.props.medrec;
    this.props.view(viewId, shareToken);
    if (medHisId !== "null") {
      this.props.firstHistory(viewId, medHisId, shareToken);
    }

    if (view.records.length !== 0) {
      this.props.allCRecords(viewId, shareToken);
    }

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
      <Container className="containera">
        <h2 className="dataDesign">Patient Profile</h2>
        <div className="navprofile1">
          <Row>
            <Col md="3" style={{ marginTop: "auto", marginBottom: "auto" }}>
              <div
                className="centerP dataDesign"
                style={{
                  marginTop: "10px",
                  marginBottom: "10px"
                }}
              >
                {view.icon ? (
                  <img
                    src={`/api/getIcon/${view.icon}`}
                    style={{
                      borderRadius: "50%",
                      border: "2px solid",
                      borderColor: "#0e4466",
                      width: "150px",
                      height: "150px"
                    }}
                  />
                ) : (
                  <IoMdPerson
                    style={{
                      borderRadius: "50%",
                      border: "2px solid",
                      borderColor: "#0e4466"
                    }}
                    size="150px"
                  />
                )}
              </div>
            </Col>
            <Col md="7" style={{ marginTop: "auto", marginBottom: "auto" }}>
              <div>
                <h2>
                  <b
                    style={{ color: "#0e4466" }}
                  >{`${view.firstName} ${view.middleName} ${view.lastName}`}</b>
                </h2>
                <h3
                  style={{ color: "#0e4466" }}
                >{`${view.birthMonth} ${view.birthDay}, ${view.birthYear}`}</h3>
                <h3 style={{ marginBottom: "0", color: "#0e4466" }}>
                  {`${view.sex}`}{" "}
                  {view.sex === "Female" ? <IoIosFemale /> : <IoIosMale />}
                </h3>
              </div>
            </Col>
            <Col md="2" className="marginPrint">
              {this.state.canPrint === true ? <Printmodal /> : null}
            </Col>
          </Row>
        </div>
        <Row>
          <Col lg="3">
            <div className="navprofile4">
              <Navbar color="faded" light>
                <Collapse isOpen={!this.state.collapsed} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink href="/viewpatient">
                        Personal Information
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/medicalhistory">Medical History</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/records">Records</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </Col>
          <Col>
            <div className="container1">
              <Router>
                <Switch>
                  <Route exact path="/viewpatient" component={PersonalInfo} />
                  <Route path="/medicalhistory" component={MedicalHistory} />
                  <Route path="/records" component={Records} />
                </Switch>
              </Router>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  medrec: state.medrec
});

export default connect(mapStateToProps, { view, firstHistory, allCRecords })(
  Profile
);
