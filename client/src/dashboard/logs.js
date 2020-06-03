import React from "react";
import { Container, Table } from "reactstrap";
import { connect } from "react-redux";

const Logs = (props) => {
  const { patient } = props.auth;

  return (
    <Container className="containera">
      <div className="position">
        <h2 className="floater-left1 dataDesign">Activity Logs</h2>
      </div>
      <Container className="container2">
        <Container className="medhis">
          <Table>
            <tbody>
              {patient.activityLogs.map((logs, index) => (
                <tr key={index}>
                  <td>{logs}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Logs);
