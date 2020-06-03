import React, { Component, Fragment } from "react";
import Menu from "./menucomponent/menu";
import { loadUser } from "./actions/authActions";
import Patient from "./dashboard/patient";
import { connect } from "react-redux";
import store from "./store";
import ClinicianNav from "./cliniciancomponent/clinicianNavbar";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const { isAuthenticated, patient, clinician, isLoading } = this.props.auth;

    if (isLoading) {
      return <Fragment></Fragment>;
    }

    return (
      <div>
        {isAuthenticated && patient ? (
          <Patient />
        ) : isAuthenticated && clinician ? (
          <ClinicianNav />
        ) : (
          <Menu />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
