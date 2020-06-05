import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonGroup,
  Row,
  Col,
  Container,
  Modal,
  ModalBody,
  Navbar
} from "reactstrap";
import classnames from "classnames";
import Personalinfo from "./personalinfo";
import Medicalhistory from "./medicalhistory";
import Record from "./record";
import Share from "./sharemodal";
import Printmodal from "./printmodal";
import {
  getPermissions,
  getHistory,
  allRecords
} from "../../actions/blockchainActions";
import { connect } from "react-redux";
import Ponestep from "../../menucomponent/psignup/ponestep";
import "antd/dist/antd.css";
import { Progress } from "antd";
import { FaDatabase } from "react-icons/fa";
class PatientDashboard extends React.Component {
  state = {
    modal2: false,
    activeTab: "1",
    percentage: 0
  };
  toggle2 = () => this.setState({ modal2: !this.state.modal2 });

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  componentDidMount() {
    const { patient } = this.props.auth;
    const percentage =
      (patient.storage.usedStorage / patient.storage.totalStorage) * 100;
    if (patient.storage.usedStorage >= patient.storage.totalStorage) {
      window.location.assign("/storage");
    }
    if (
      patient.nationality === undefined ||
      patient.address === undefined ||
      patient.civilStatus === undefined ||
      patient.religion === undefined ||
      patient.contactNumber === undefined ||
      patient.guardianName === undefined ||
      patient.relationship === undefined ||
      patient.guardianContactNo === undefined
    ) {
      this.setState({
        modal2: !this.state.modal2
      });
    }
    if (patient.histories.length !== 0) {
      this.props.getHistory(patient.histories[0].MedHisId);
    }
    if (patient.records.length !== 0) {
      this.props.allRecords();
    }
    this.setState({ percentage });
    this.props.getPermissions();
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    const { usedStorage, totalStorage } = this.props.auth.patient.storage;
    return (
      <Container
        fluid
        style={{
          width: "80%"
        }}
      >
        <h2 className=" dataDesign">My Medical Record</h2>
        <Row>
          <Col lg={{ size: 9, order: 1 }} xs={{ order: 12 }}>
            <Navbar>
              <Nav tabs justified>
                <NavItem className="navhome1 dataDesign">
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    <b>Personal Information</b>
                  </NavLink>
                </NavItem>
                <NavItem className="navhome1 dataDesign">
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    <b>Medical History</b>
                  </NavLink>
                </NavItem>
                <NavItem className="navhome1 dataDesign">
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.toggle("3");
                    }}
                  >
                    <b>Records</b>
                  </NavLink>
                </NavItem>
              </Nav>
            </Navbar>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Personalinfo />
              </TabPane>
              <TabPane tabId="2">
                <Medicalhistory />
              </TabPane>
              <TabPane tabId="3">
                <Record />
              </TabPane>
            </TabContent>
          </Col>
          <Col lg={{ size: 3, order: 12, offset: 0.5 }} xs={{ order: 1 }}>
            <Row>
              <ButtonGroup vertical style={{ width: "100%" }}>
                <Button className="buttondash" outline color="secondary">
                  <Share />
                </Button>
                <Button className="buttondash" outline color="secondary">
                  <Printmodal />
                </Button>
              </ButtonGroup>
              <Col>
                <h4>
                  <FaDatabase size="30px" color="#0084b4" />
                  <b
                    style={{
                      paddingLeft: "10px"
                    }}
                  >
                    Storage
                  </b>
                </h4>
                <Progress
                  percent={this.state.percentage}
                  showInfo={false}
                  strokeColor="#57c2e6"
                />
                <div style={{ paddingBottom: "10px" }}>
                  {this.formatBytes(usedStorage)} of{" "}
                  {totalStorage === 10485760
                    ? "10 MB"
                    : totalStorage === 524288000
                    ? "500 MB"
                    : totalStorage === 1073741824
                    ? "1 GB"
                    : totalStorage}{" "}
                  used
                </div>
                <Nav>
                  <NavItem>
                    <NavLink
                      style={{ color: "#57c2e6", padding: "0px" }}
                      href="/storage"
                    >
                      <b>Buy Storage</b>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal
          centered
          isOpen={this.state.modal2}
          toggle2={this.toggle2}
          size="lg"
        >
          <ModalBody>
            <Ponestep />
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  medrec: state.medrec
});

export default connect(mapStateToProps, {
  getPermissions,
  getHistory,
  allRecords
})(PatientDashboard);
