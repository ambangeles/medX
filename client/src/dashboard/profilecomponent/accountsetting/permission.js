import React from "react";
import { Container, Row, Col, Input, Button } from "reactstrap";
import { updatePermission } from "../../../actions/blockchainActions";
import { connect } from "react-redux";
import update from "immutability-helper";
import CircularProgress from "@material-ui/core/CircularProgress";

class Permission extends React.Component {
  state = {
    permissions: [],
    loading: false
  };

  componentDidMount() {
    const { permissions } = this.props.medrec;
    this.setState({
      permissions
    });
  }

  canView = (id) => {
    const canView = this.state.permissions[
      this.state.permissions.findIndex((test) => test._id === id)
    ].canView;
    this.setState({
      permissions: update(this.state.permissions, {
        [this.state.permissions.findIndex((test) => test._id === id)]: {
          canView: { $set: !canView }
        }
      })
    });
  };

  canPrint = (id) => {
    const canPrint = this.state.permissions[
      this.state.permissions.findIndex((test) => test._id === id)
    ].canPrint;
    this.setState({
      permissions: update(this.state.permissions, {
        [this.state.permissions.findIndex((test) => test._id === id)]: {
          canPrint: { $set: !canPrint }
        }
      })
    });
  };

  canInsert = (id) => {
    const canInsert = this.state.permissions[
      this.state.permissions.findIndex((test) => test._id === id)
    ].canInsert;
    this.setState({
      permissions: update(this.state.permissions, {
        [this.state.permissions.findIndex((test) => test._id === id)]: {
          canInsert: { $set: !canInsert }
        }
      })
    });
  };

  onClick = () => {
    this.setState({ loading: true });
    this.state.permissions.map((permission1) => {
      const canView = this.state.permissions[
        this.state.permissions.findIndex((test) => test._id === permission1._id)
      ].canView;
      const canPrint = this.state.permissions[
        this.state.permissions.findIndex((test) => test._id === permission1._id)
      ].canPrint;
      const canInsert = this.state.permissions[
        this.state.permissions.findIndex((test) => test._id === permission1._id)
      ].canInsert;

      const permission = {
        canView,
        canPrint,
        canInsert
      };
      this.props.updatePermission(permission1._id, permission);
    });
  };

  render() {
    if (this.props.medrec.msg === "UPDATE_PERMISSIONS_SUCCESS") {
      window.location.assign("/");
    }
    const permissions = this.state.permissions;
    if (permissions !== null) {
      return (
        <Container className="position">
          <h2 className="floater-left1 dataDesign">Permissions</h2>
          <Button
            color="primary"
            style={{
              height: "40px",
              width: "130px",
              marginTop: "20px",
              borderRadius: "50px",
              fontWeight: "bold"
            }}
            onClick={this.onClick}
            disabled={this.state.loading || permissions.length === 0}
          >
            {this.state.loading ? (
              <CircularProgress color="light" size="26px" />
            ) : (
              "Save Changes"
            )}
          </Button>
          {permissions.length === 0 ? (
            <Container className="floater-left1 ">
              <Row style={{ marginLeft: "20px" }} md="2">
                <h5 className="dataDesign">No Permission</h5>
              </Row>
            </Container>
          ) : (
            <Container className="floater-left1 permis">
              {permissions.map((permission) => (
                <Row key={permission._id} className="containerp">
                  <Col md="4" style={{ marginTop: "10px" }}>
                    <span className="dataDesign">{permission.name}</span>
                    <br />
                    {permission.occupation}
                    <br />
                    {permission.sex}
                  </Col>
                  <Col
                    md="6"
                    style={{
                      marginTop: "auto",
                      marginBottom: "auto",
                      marginLeft: "10px"
                    }}
                  >
                    <Row>
                      {this.state.permissions[
                        this.state.permissions.findIndex(
                          (test) => test._id === permission._id
                        )
                      ].canView ? (
                        <Col md="4">
                          <Input
                            type="checkbox"
                            defaultValue={
                              permissions[
                                permissions.findIndex(
                                  (test) => test._id === permission._id
                                )
                              ].canView
                            }
                            onChange={this.canView.bind(this, permission._id)}
                            checked
                          />
                          Can view
                        </Col>
                      ) : (
                        <Col md="4">
                          <Input
                            type="checkbox"
                            defaultValue={
                              permissions[
                                permissions.findIndex(
                                  (test) => test._id === permission._id
                                )
                              ].canView
                            }
                            onChange={this.canView.bind(this, permission._id)}
                          />
                          Can view
                        </Col>
                      )}
                      {this.state.permissions[
                        this.state.permissions.findIndex(
                          (test) => test._id === permission._id
                        )
                      ].canPrint ? (
                        <Col md="4">
                          <Input
                            type="checkbox"
                            defaultValue={
                              permissions[
                                permissions.findIndex(
                                  (test) => test._id === permission._id
                                )
                              ].canPrint
                            }
                            onChange={this.canPrint.bind(this, permission._id)}
                            checked
                          />
                          Can print
                        </Col>
                      ) : (
                        <Col md="4">
                          <Input
                            type="checkbox"
                            defaultValue={
                              permissions[
                                permissions.findIndex(
                                  (test) => test._id === permission._id
                                )
                              ].canPrint
                            }
                            onChange={this.canPrint.bind(this, permission._id)}
                          />
                          Can print
                        </Col>
                      )}
                      {this.state.permissions[
                        this.state.permissions.findIndex(
                          (test) => test._id === permission._id
                        )
                      ].canInsert ? (
                        <Col md="4">
                          <Input
                            type="checkbox"
                            defaultValue={
                              permissions[
                                permissions.findIndex(
                                  (test) => test._id === permission._id
                                )
                              ].canInsert
                            }
                            onChange={this.canInsert.bind(this, permission._id)}
                            checked
                          />
                          Can insert
                        </Col>
                      ) : (
                        <Col md="4">
                          <Input
                            type="checkbox"
                            defaultValue={
                              permissions[
                                permissions.findIndex(
                                  (test) => test._id === permission._id
                                )
                              ].canInsert
                            }
                            onChange={this.canInsert.bind(this, permission._id)}
                          />
                          Can insert
                        </Col>
                      )}
                    </Row>
                  </Col>
                </Row>
              ))}
            </Container>
          )}
        </Container>
      );
    } else {
      return <div></div>;
    }
  }
}
const mapStateToProps = (state) => ({
  medrec: state.medrec
});

export default connect(mapStateToProps, { updatePermission })(Permission);
