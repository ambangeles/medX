import React, { Component } from "react";
import { Container, Form, Button, Alert } from "reactstrap";
import { selectOccupation } from "../../actions/authActions";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

class COccupation extends Component {
  state = {
    msg: "",
    occupation: "",
    loading: false
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "SELECT_OCCUPATION_FAIL") {
        this.setState({ msg: error.msg.msg, loading: false });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onClick = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.selectOccupation(this.state);
  };

  goBack = () => {
    window.location.assign("/clinician");
  };
  render() {
    if (this.props.auth.msg === "SELECT_OCCUPATION_SUCCESS") {
      window.location.assign("/cidentity");
    }
    return (
      <Container>
        <div className="bottom">
          <h2 className="dataDesign">We want to know you more</h2>
          <p>What is your occupation?</p>
          {this.state.msg ? (
            <Alert color="danger"> {this.state.msg}</Alert>
          ) : null}
          <Form onSubmit={this.onSubmit}>
            <div style={{ marginBottom: "400px" }} role="group">
              <Button
                color="primary"
                className="buttongrp"
                name="occupation"
                value="Physician"
                type="button"
                onClick={this.onClick}
                disabled={this.state.occupation === "Physician"}
              >
                Physician
              </Button>
              <Button
                color="primary"
                className="buttongrp"
                name="occupation"
                value="Nurse"
                type="button"
                onClick={this.onClick}
                disabled={this.state.occupation === "Nurse"}
              >
                Nurse
              </Button>
              <Button
                color="primary"
                className="buttongrp"
                name="occupation"
                value="Secretary"
                type="button"
                onClick={this.onClick}
                disabled={this.state.occupation === "Secretary"}
              >
                Secretary
              </Button>
            </div>

            <Button
              color="primary"
              style={{ height: "75px", width: "75px", borderRadius: "50%" }}
              className="fixedright1"
              disabled={this.state.loading}
            >
              {this.state.loading ? (
                <CircularProgress color="light" size="50px" />
              ) : (
                <FaArrowRight size="50px" />
              )}
            </Button>
          </Form>
          <Button
            color="primary"
            style={{ height: "75px", width: "75px", borderRadius: "50%" }}
            className="fixedleft1"
            onClick={this.goBack}
          >
            <FaArrowLeft size="50px" />
          </Button>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth
});

export default connect(mapStateToProps, { selectOccupation })(COccupation);
