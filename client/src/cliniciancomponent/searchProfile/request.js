import React from "react";
import {
  Container,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownMenu,
  Button,
  DropdownItem,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Form,
  Row,
  Col,
  Label,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { request, cancelRequest, view } from "../../actions/blockchainActions";
import CircularProgress from "@material-ui/core/CircularProgress";

class Request extends React.Component {
  state = {
    modal2: false,
    _id: "",
    reason: "",
    message: "",
    duration: "",
    loading: false,
    msg: ""
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REQUEST_FAIL") {
        this.setState({ msg: error.msg.msg, loading: false });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  toggle2 = (_id) => {
    this.setState({ modal2: !this.state.modal2 });
    this.setState({ _id });
  };
  cancel = () => {
    this.setState({ modal2: !this.state.modal2 });
    this.setState({ _id: "", reason: "", message: "", duration: "" });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { _id, reason, message, duration, isRequested } = this.state;
    const user = {
      _id,
      reason,
      message,
      duration,
      isRequested
    };
    this.props.request(user);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setId = (_id) => {
    this.setState({ _id });
  };

  cancelrequest = () => {
    this.setState({ loading: true });
    this.props.cancelRequest(this.state._id);
  };

  view = (_id) => {
    const permissions = this.props.medrec.permissions;
    this.props.view(
      _id,
      permissions[permissions.findIndex((per) => per.patientId === _id)]
        .shareToken
    );
  };

  render() {
    const permissions = this.props.medrec.permissions;

    return (
      <div style={{ backgroundColor: "white" }}>
        <tr className="row">
          <td className="col">
            <b>
              {this.props.search.firstName} {this.props.search.middleName}{" "}
              {this.props.search.lastName}
            </b>
          </td>
          <td className="col">
            {this.props.auth.clinician.isRequested.some(
              (req) => req.patientId === this.props.search._id
            ) === true ? (
              <UncontrolledDropdown color="secondary" className="fixedright1">
                <DropdownToggle
                  caret
                  onClick={this.setId.bind(this, this.props.search._id)}
                  style={{ fontWeight: "bold" }}
                >
                  Pending
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={this.cancelrequest}
                    disabled={this.state.loading}
                    style={{ fontWeight: "bold" }}
                  >
                    Cancel
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : permissions.findIndex(
                (per) => per.patientId === this.props.search._id
              ) !== -1 ? (
              permissions[
                permissions.findIndex(
                  (per) => per.patientId === this.props.search._id
                )
              ].canView === true ? (
                <Button
                  color="primary"
                  className="fixedright1"
                  style={{
                    fontWeight: "bold",
                    borderRadius: "20px"
                  }}
                  onClick={this.view.bind(this, this.props.search._id)}
                >
                  View
                </Button>
              ) : null
            ) : (
              <Button
                color="primary"
                className="fixedright1"
                style={{
                  fontWeight: "bold",
                  borderRadius: "20px"
                }}
                onClick={this.toggle2.bind(this, this.props.search._id)}
              >
                Request Access
              </Button>
            )}
            <Modal
              centered
              isOpen={this.state.modal2}
              modalTransition={{ timeout: 700 }}
              backdropTransition={{ timeout: 1300 }}
              toggle2={this.toggle2}
              size="lg"
            >
              <ModalBody>
                <Container>
                  <h2 className="dataDesign">
                    Include a message for the patient
                  </h2>
                  <h6>
                    Tell the patient why you are interested in their information
                    to increase the chance of granting you permission.
                  </h6>
                  {this.state.msg ? (
                    <Alert color="danger"> {this.state.msg}</Alert>
                  ) : null}
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Row>
                        <Col xs="8">
                          <Label for="reason">What is your reason?</Label>
                          <Input
                            type="select"
                            name="reason"
                            value={this.state.reason}
                            id="reason"
                            onChange={this.onChange}
                          >
                            <option value="" disabled hidden>
                              Reason
                            </option>
                            <option>For your consultation </option>
                            <option>For research purposes</option>
                          </Input>
                        </Col>
                        <Col xs="3">
                          <Label for="duration">Duration</Label>
                          <Input
                            type="select"
                            name="duration"
                            value={this.state.duration}
                            id="duration"
                            onChange={this.onChange}
                          >
                            <option value="" disabled hidden>
                              Duration
                            </option>
                            <option value="86400">24 hrs</option>
                            <option value="172800">2 days</option>
                            <option value="604800">1 week</option>
                          </Input>
                        </Col>
                      </Row>

                      <Label for="message"> Message (Optional):</Label>
                      <Input
                        type="textarea"
                        name="message"
                        id="message"
                        placeholder="Enter your message"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                    <Button
                      color="link"
                      onClick={this.cancel}
                      style={{ fontWeight: "bold" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      style={{
                        fontWeight: "bold",
                        borderRadius: "20px",
                        width: "120px",
                        height: "40px"
                      }}
                      disabled={this.state.loading}
                    >
                      {this.state.loading ? (
                        <CircularProgress color="light" size="25px" />
                      ) : (
                        "Send"
                      )}
                    </Button>
                  </Form>
                </Container>
              </ModalBody>
            </Modal>
          </td>
        </tr>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  medrec: state.medrec,
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, { request, cancelRequest, view })(
  Request
);
