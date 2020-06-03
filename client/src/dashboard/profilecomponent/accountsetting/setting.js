import React from "react";
import { Navbar, Nav, NavItem, NavLink, Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Permission from "./permission";
import EmailAddress from "./email";
import Password from "./password";

class Setting extends React.Component {
  render() {
    return (
      <Container className="containera">
        <h2 className="dataDesign">Account Setting</h2>
        <Row>
          <Col lg="3">
            <div className="navprofile4">
              <Navbar color="faded" light>
                <Nav navbar>
                  <NavItem>
                    <NavLink href="/setting">Permission</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/emailaddress">Email Address</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/password">Password</NavLink>
                  </NavItem>
                </Nav>
              </Navbar>
            </div>
          </Col>
          <Col>
            <div className="container2">
              <Router>
                <Switch>
                  <Route exact path="/setting" component={Permission} />
                  <Route exact path="/emailaddress" component={EmailAddress} />
                  <Route exact path="/password" component={Password} />
                </Switch>
              </Router>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Setting;
