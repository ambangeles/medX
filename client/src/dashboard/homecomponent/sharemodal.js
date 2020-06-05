import React, { Component } from "react";
import {
  CustomInput,
  FormGroup,
  Alert,
  ModalHeader,
  Form,
  Label,
  Button,
  NavLink,
  Input,
  Modal,
  ModalBody,
  Row,
  Col
} from "reactstrap";
import { FaRegShareSquare } from "react-icons/fa";
import { share } from "../../actions/blockchainActions";
import { connect } from "react-redux";
import { clearErrors } from "../../actions/errorActions";
import CircularProgress from "@material-ui/core/CircularProgress";

class Share extends Component {
  state = {
    modal: false,
    email: "",
    expiration: "",
    canPrint: false,
    canInsert: false,
    msg: null,
    loading: false
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "SHARE_FAIL") {
        this.setState({ msg: error.msg.msg, loading: false });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  toggle1 = () => {
    this.setState({ modal: !this.state.modal, expiration: "" });
    this.props.clearErrors();
  };

  canView = () => {
    this.setState({ canView: !this.state.canView });
  };

  canPrint = () => {
    this.setState({ canPrint: !this.state.canPrint });
  };

  canInsert = () => {
    this.setState({ canInsert: !this.state.canInsert });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { email, expiration, canPrint, canInsert } = this.state;

    const user = { email, expiration, canPrint, canInsert };

    // Attempt to login
    this.props.share(user);
  };

  render() {
    if (this.props.medrec.msg === "SHARE_SUCCESS") {
      window.location.assign("/");
    }
    const { className } = this.props;
    return (
      <div>
        <NavLink onClick={this.toggle1} className="button" color="link">
          <FaRegShareSquare size="30px" color="#0084b4" /> <b>SHARE</b>
        </NavLink>

        <Modal
          centered
          isOpen={this.state.modal}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 600 }}
          toggle1={this.toggle1}
          className={className}
          size="lg"
        >
          <ModalHeader>
            <h2 className="dataDesign">Share with your clinician</h2>
            <h6>
              Your clinician will have an access to all your information for the
              specified duration.
            </h6>
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger"> {this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Row>
                  <Col md={6}>
                    <Label for="email">Clinician</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="mb-3"
                      onChange={this.onChange}
                    />
                  </Col>
                  <Col md={3}>
                    <Label for="expiration">Duration</Label>
                    <Input
                      type="select"
                      name="expiration"
                      value={this.state.expiration}
                      id="expiration"
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
                  <Col>
                    <Label for="exampleCheckbox">Limits</Label>
                    <div>
                      <CustomInput
                        type="checkbox"
                        id="exampleCustomCheckbox3"
                        label="Can print"
                        onChange={this.canPrint}
                      />
                      <CustomInput
                        type="checkbox"
                        id="exampleCustomCheckbox4"
                        label="Can insert"
                        onChange={this.canInsert}
                      />
                    </div>
                  </Col>
                </Row>
                <Button
                  className="fixedright1"
                  color="primary"
                  style={{
                    marginTop: "20px",
                    borderRadius: "50px",
                    fontWeight: "bold",
                    width: "80px",
                    height: "40px"
                  }}
                  disabled={this.state.loading}
                >
                  {this.state.loading ? (
                    <CircularProgress color="light" size="25px" />
                  ) : (
                    "Share"
                  )}
                </Button>
                <NavLink
                  onClick={this.toggle1}
                  style={{
                    float: "right",
                    color: "rgb(0,123,255)",
                    marginTop: "20px"
                  }}
                >
                  <b>Cancel</b>
                </NavLink>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  medrec: state.medrec,
  auth: state.auth
});

export default connect(mapStateToProps, { share, clearErrors })(Share);
