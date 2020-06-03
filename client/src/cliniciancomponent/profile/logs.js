import React from "react";
import { Container, Table } from "reactstrap";
import { connect } from "react-redux";

const Logs = (props) => {
  const { clinician } = props.auth;
  return (
    <div style={{ backgroundColor: "white" }}>
      {" "}
      <Container className="containera">
        <div className="position">
          <h2 className="floater-left1 dataDesign">Activity Logs</h2>
        </div>
        <Container className="container2">
          <Container className="medhis">
            <Table>
              <tbody>
                {clinician.activityLogs.map((logs, index) => (
                  <tr key={index}>
                    <td>{logs}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Container>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Logs);
