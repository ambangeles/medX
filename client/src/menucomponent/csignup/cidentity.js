import React, { Component } from "react";
import {
  Form,
  FormText,
  Label,
  Input,
  Container,
  Button,
  Alert,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";
import { connect } from "react-redux";
import { uploadRegisterC } from "../../actions/authActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";

class CIdentity extends Component {
  state = {
    msg: "",
    file: "",
    loading: false
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "UPLOAD_REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg, loading: false });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append("file", this.state.file);
    this.props.uploadRegisterC(
      formData,
      this.props.auth.firstStep,
      this.props.auth.occupation
    );
  };

  goBack = () => {
    window.location.assign("/clinician");
  };

  render() {
    return (
      <Container>
        <div className="bottom">
          <Form
            onSubmit={this.onSubmit}
            action="/upload"
            method="POST"
            enctype="multipart/form-data"
          >
            <h2 className="dataDesign">Verify your Identity</h2>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Label for="file">
              Upload a picture of your Professional Regulation Commission ID
              (PRC ID)
            </Label>
            <Input
              type="file"
              name="file"
              id="file"
              onChange={this.onChange}
              accept="image/*"
            />
            <FormText style={{ marginBottom: "400px" }} color="muted">
              By clicking Done,you agree to our{" "}
              <a href="/">Terms & Condition</a> and that you have read the{" "}
              <a href="/">Privacy Policy</a>.
            </FormText>
            <Button
              id="PopoverFocus"
              color="primary"
              style={{
                marginTop: "15px",
                height: "60px",
                width: "90px",
                borderRadius: "50px",
                fontWeight: "bold",
                fontSize: "20px"
              }}
              className="fixedright1"
              disabled={this.state.loading}
            >
              {this.state.loading ? (
                <CircularProgress color="light" size="50px" />
              ) : (
                "Done"
              )}
            </Button>
            <UncontrolledPopover
              trigger="hover"
              placement="bottom"
              target="PopoverFocus"
            >
              <PopoverHeader>
                <h2 style={{ marginBottom: "0px" }}>
                  <b>Note!</b>
                </h2>
              </PopoverHeader>
              <PopoverBody>
                <FaRegAddressCard size="60px" className="floater" />
                <h5>
                  We will first verify your account. Once complete, You will be
                  notified through email and you can now use your account!
                </h5>
              </PopoverBody>
            </UncontrolledPopover>
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

export default connect(mapStateToProps, { uploadRegisterC })(CIdentity);
