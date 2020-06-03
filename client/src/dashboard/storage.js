import React, { Component } from "react";
import {
  Col,
  Row,
  Container,
  Card,
  CardTitle,
  CardText,
  Button,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { changePlan } from "../actions/authActions";

class Storage extends Component {
  state = {
    totalStorage: null
  };

  componentWillMount() {
    this.setState({
      totalStorage: this.props.auth.patient.storage.totalStorage
    });
  }

  setStorage = (plan) => {
    this.props.changePlan(plan);
  };
  render() {
    if (this.props.auth.msg === "CHANGE_PLAN_SUCCESS") {
      window.location.assign("/");
    }
    return (
      <div className="CONTAINER">
        <Container>
          <div className="CONTAINER15">
            <div style={{ marginBottom: "50px", marginTop: "50px" }}>
              <h2 className="center dataDesign">Upgrade for more storage</h2>
              <h5 className="center">Get more space!</h5>
            </div>
            {this.props.auth.patient.storage.usedStorage >=
            this.props.auth.patient.storage.totalStorage ? (
              <Alert color="danger">
                You are running out of storage. Please upgrade to store medical
                records
              </Alert>
            ) : null}
            <Row>
              <Col lg="4" className="center">
                <Card
                  className="cardy"
                  style={{ width: "85%", height: "300px" }}
                  body
                >
                  <CardText style={{ marginTop: "35px" }}>
                    <h1 className="dataDesign">10 MB</h1>
                  </CardText>
                  <CardText>
                    <p>Free</p>
                  </CardText>
                  <Button
                    outline
                    color="primary"
                    disabled={
                      this.state.totalStorage === 10485760 ||
                      this.state.totalStorage === 524288000 ||
                      this.state.totalStorage === 1073741824
                    }
                  >
                    {this.state.totalStorage === 10485760
                      ? "Current Plan"
                      : this.state.totalStorage === 524288000 ||
                        this.state.totalStorage === 1073741824
                      ? "Not available"
                      : "Free"}
                  </Button>
                </Card>
              </Col>
              <Col lg="4" className="center">
                <Card
                  className="cardy"
                  style={{ width: "85%", height: "300px" }}
                  body
                >
                  <CardTitle>Recommended</CardTitle>
                  <CardText>
                    <h1 className="dataDesign">500 MB</h1>
                  </CardText>
                  <Button
                    outline
                    color="primary"
                    style={{ marginTop: "50px" }}
                    disabled={this.state.totalStorage === 524288000}
                    onClick={this.setStorage.bind(this, 524288000)}
                  >
                    {this.state.totalStorage === 524288000
                      ? "Current Plan"
                      : "Php 100/month"}
                  </Button>
                </Card>
              </Col>
              <Col lg="4" className="center">
                <Card
                  className="cardy"
                  style={{ width: "85%", height: "300px" }}
                  body
                >
                  <CardText style={{ marginTop: "30px" }}>
                    <h1 className="dataDesign">1 GB</h1>
                  </CardText>
                  <Button
                    outline
                    color="primary"
                    style={{ marginTop: "55px" }}
                    disabled={this.state.totalStorage === 1073741824}
                    onClick={this.setStorage.bind(this, 1073741824)}
                  >
                    {this.state.totalStorage === 1073741824
                      ? " Current Plan"
                      : "Php 200/month"}
                  </Button>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { changePlan })(Storage);
