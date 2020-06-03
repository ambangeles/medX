import React from "react";
import { IoMdPerson } from "react-icons/io";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PatientDashboard from "./homecomponent/patientdashboard";
import Logs from "./logs";
import EditAbout from "./profilecomponent/profile/editabout";
import Profile from "./profilecomponent/profile/profiles";
import Setting from "./profilecomponent/accountsetting/setting";
import Logout from "../menucomponent/logout";
import { connect } from "react-redux";
import Notification from "./notification";
import Storage from "./storage";
import Ponestep from "../menucomponent/psignup/ponestep";

class Patient extends React.Component {
  state = {
    isOpen: false
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    if (this.props.auth.msg === "LOGIN_SUCCESS") {
      window.location.assign("/");
    }
    const { patient } = this.props.auth;
    return (
      <div>
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
                <img className="img1" src="./medX.png" />
              </NavbarBrand>
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
                    {patient ? `${patient.lastName}` : ""}
                  </NavbarBrand>
                  {patient.icon ? (
                    <img
                      src={`/api/getIcon/${patient.icon}`}
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
            <Route exact path="/" component={PatientDashboard} />
            <Route exact path="/storage" component={Storage} />
            <Route exact path="/notif" component={Notification} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/practitioners" component={Profile} />
            <Route exact path="/logs" component={Logs} />
            <Route exact path="/setting" component={Setting} />
            <Route exact path="/setup" component={Ponestep} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/editabout" component={EditAbout} />
            <Route exact path="/permission" component={Setting} />
            <Route exact path="/emailaddress" component={Setting} />
            <Route exact path="/password" component={Setting} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Patient);
