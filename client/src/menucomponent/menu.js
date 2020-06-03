import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./homePage";
import About from "./aboutus";
import Login from "./login";
import PatientUser from "./psignup/patientsign";
import ClinicianUser from "./csignup/cliniciansign";
import PEmail from "./psignup/pemail";
import CEmail from "./csignup/cemail";
import PIdentity from "../menucomponent/psignup/pidentity";
import CIdentity from "../menucomponent/csignup/cidentity";
import POnestep from "../menucomponent/psignup/ponestep";
import COccupation from "../menucomponent/csignup/coccupation";
import Forgotpassword from "./forgotpassword";
import Changepassword from "./changepassword";

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="Navbar1" sticky="top" color="white" light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavbarBrand href="/">
                <img className="img1" src="./medX.png" />
              </NavbarBrand>
            </NavItem>
          </Nav>
          <Nav navbar>
            <NavItem className="allign">
              <NavLink href="/aboutus">About Us</NavLink>
            </NavItem>
            <NavItem className="allign">
              <NavLink href="/login">Log In</NavLink>
            </NavItem>
            <UncontrolledDropdown>
              <DropdownToggle nav style={{ color: "white" }}>
                <Button
                  color="primary"
                  style={{
                    paddingBottom: "30px",
                    width: "120px",
                    borderRadius: "40px",
                    height: "30px"
                  }}
                >
                  <b>Sign Up</b>
                </Button>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/patient">I'm a patient</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/clinician">I'm a clinician</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/reset/:token" component={Changepassword} />
          <Route path="/aboutus" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/forgotpassword" component={Forgotpassword} />
          <Route path="/patient" component={PatientUser} />
          <Route path="/clinician" component={ClinicianUser} />
          <Route path="/verify" component={PEmail} />
          <Route path="/cverify" component={CEmail} />
          <Route path="/identity" component={PIdentity} />
          <Route path="/cidentity" component={CIdentity} />
          <Route path="/setup" component={POnestep} />
          <Route path="/coccupation" component={COccupation} />
        </Switch>
      </Router>
    </div>
  );
};

export default Menu;
