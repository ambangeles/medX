import React from "react";
import { Container, Table, Row, Col } from "reactstrap";
import { IoMdPerson } from "react-icons/io";
import { connect } from "react-redux";

class Practitioner extends React.Component {
  render() {
    const { patient } = this.props.auth;

    return (
      <Container>
        <div>
          <h2 className="floater-left1 dataDesign">Your Practitioners</h2>
          <Container className="floater-left1 practitioner">
            <Table>
              <tbody>
                {patient.practitioners.map(
                  ({ icon, clinicianName, occupation }, index) => (
                    <tr key={index}>
                      <td>
                        <Row>
                          <Col>
                            {icon ? (
                              <div className="displayimg">
                                <img
                                  src={`/api/getIcon/${icon}`}
                                  style={{
                                    borderRadius: "50%",
                                    border: "2px solid",
                                    borderColor: "#0e4466",
                                    color: "#0e4466",
                                    marginTop: "5px",
                                    marginRight: "10px",
                                    width: "100px",
                                    height: "100px"
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="displayimg">
                                <IoMdPerson
                                  style={{
                                    borderRadius: "50%",
                                    border: "2px solid",
                                    borderColor: "#0e4466",
                                    color: "#0e4466",
                                    marginTop: "5px",
                                    marginRight: "10px"
                                  }}
                                  size="100px"
                                />
                              </div>
                            )}
                          </Col>
                          <Col lg="9">
                            <div className="display dataDesign">
                              {occupation} <b>&nbsp;|&nbsp;</b> {clinicianName}
                            </div>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Container>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Practitioner);
