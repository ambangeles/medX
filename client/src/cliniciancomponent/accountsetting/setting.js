import React, { useState } from "react";
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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EmailAddress from "./email";
import Password from "./password";

const Setting = (props) => {
  const [collapsed] = useState(false);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Container className="containera">
        <h2 className="dataDesign">Account Setting</h2>
        <Row>
          <Col lg="3">
            <div className="navprofile4">
              <Navbar color="faded" light>
                <Collapse isOpen={!collapsed} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink href="/setting">Email Address</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/password">Password</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          </Col>
          <Col>
            <div className="container2">
              <Router>
                <Switch>
                  <Route exact path="/setting" component={EmailAddress} />
                  <Route path="/password" component={Password} />
                </Switch>
              </Router>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Setting;
