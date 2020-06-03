import React from "react";
import { IoMdPerson } from "react-icons/io";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem
} from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Logs from "../cliniciancomponent/profile/logs";
import EditAbout from "../cliniciancomponent/profile/editabout";
import Profile from "../cliniciancomponent/profile/profiles";
import SearchProfile from "../cliniciancomponent/searchProfile/profiles";
import Setting from "../cliniciancomponent/accountsetting/setting";
import Search from "../cliniciancomponent/profile/search";
import Logout from "../menucomponent/logout";
import MiniSearch from "./minisearch";
import Notification from "./notification";

import InsertMedicalRecords from "./searchProfile/insertrecords";
import InsertMedical from "./searchProfile/insertmedicalhistory";
import Fmedicalrecords from "./searchProfile/fmedicalrecord";

class ClinicianNav extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    if (this.props.auth.msg === "LOGIN_SUCCESS") {
      window.location.assign("/");
    }
    const { clinician } = this.props.auth;
    return (
      <div className="dirty">
        <Navbar
          className="Navbar1"
          sticky="top"
          color="white"
          light
          expand="md"
        >
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavbarBrand href="/">
                <img className="img1" src="medX.png" />
              </NavbarBrand>
              {this.props.medrec.msg === "SEARCH_SUCCESS" ? (
                <MiniSearch />
              ) : null}
            </Nav>
            <Nav navbar>
              <NavItem className="allign">
                <NavLink href="/">
                  <h5>Home</h5>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <Notification href="/notif" />
              </UncontrolledDropdown>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <NavbarBrand>
                    {clinician ? `${clinician.lastName}` : ""}
                  </NavbarBrand>
                  {clinician.icon ? (
                    <img
                      src={`/api/getIcon/${clinician.icon}`}
                      style={{
                        borderRadius: "50%",
                        border: "1px solid black",
                        width: "30px",
                        height: "30px"
                      }}
                    />
                  ) : (
                    <IoMdPerson
                      style={{
                        borderRadius: "50%",
                        border: "1px solid black"
                      }}
                      size="30px"
                    />
                  )}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink href="/profile">Your Profile</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/setting">Account Settings</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/logs"> Activity Logs</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <Logout href="/logout" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        <Router>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/notif" />
            <Route exact path="/profile" component={Profile} />
            <Route path="/logs" component={Logs} />
            <Route path="/setting" component={Setting} />
            <Route path="/editabout" component={EditAbout} />
            <Route path="/viewpatient" component={SearchProfile} />
            <Route path="/medicalhistory" component={SearchProfile} />
            <Route path="/records" component={SearchProfile} />
            <Route path="/patients" component={Profile} />
            <Route path="/password" component={Setting} />
            <Route path="/insertrecord" component={InsertMedicalRecords} />
            <Route path="/inserthistory" component={InsertMedical} />
            <Route path="/record" component={Fmedicalrecords} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  medrec: state.medrec
});

export default connect(mapStateToProps)(ClinicianNav);
