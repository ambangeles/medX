import React, { Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
  Label,
  NavLink,
  Button
} from "reactstrap";
import { insertRecord } from "../../actions/blockchainActions";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

class InsertMedicalRecords extends React.Component {
  state = {
    loading: false,
    modal2: false,
    bloodPressure: "",
    pulseRate: "",
    respiratoryRate: "",
    temperature: "",
    heent: "",
    heart: "",
    lungs: "",
    abdomen: "",
    extremities: "",
    completeBloodCount: "",
    urinalysis: "",
    fecalysis: "",
    chestXray: "",
    isihiraTest: "",
    audio: "",
    psychologicalExam: "",
    drugTest: "",
    hepatitisBTest: "",
    complaints: "",
    diagnosis: "",
    treatment: "",
    remarks: "",
    shareToken: ""
  };

  componentDidMount() {
    const { permissions, viewId } = this.props.medrec;
    this.setState({
      shareToken:
        permissions[permissions.findIndex((per) => per.patientId === viewId)]
          .shareToken
    });
  }

  toggle2 = () => this.setState({ modal2: !this.state.modal2 });

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const {
      bloodPressure,
      pulseRate,
      respiratoryRate,
      temperature,
      heent,
      heart,
      lungs,
      abdomen,
      extremities,
      completeBloodCount,
      urinalysis,
      fecalysis,
      chestXray,
      isihiraTest,
      audio,
      psychologicalExam,
      drugTest,
      hepatitisBTest,
      complaints,
      diagnosis,
      treatment,
      remarks
    } = this.state;
    const record = {
      bloodPressure,
      pulseRate,
      respiratoryRate,
      temperature,
      heent,
      heart,
      lungs,
      abdomen,
      extremities,
      completeBloodCount,
      urinalysis,
      fecalysis,
      chestXray,
      isihiraTest,
      audio,
      psychologicalExam,
      drugTest,
      hepatitisBTest,
      complaints,
      diagnosis,
      treatment,
      remarks
    };
    this.props.insertRecord(
      record,
      this.props.medrec.viewId,
      this.state.shareToken
    );
  };

  render() {
    if (this.props.medrec.msg === "RECORD_INSERTED_SUCCESS") {
      window.location.assign("/records");
    }
    return (
      <Form>
        <Container>
          <h2 className="dataDesign">Insert Record</h2>
          <Label>
            <h5 className="dataDesign">Physical Examination Findings</h5>
          </Label>
          <Container className="div2">
            <Row style={{ borderBottomStyle: "solid", paddingTop: "10px" }}>
              <Col lg="2">
                <FormGroup className="dataDesign">Vital Signs</FormGroup>
              </Col>
              <Col lg="8">
                <Row>
                  <Col>
                    <Row>
                      <Col lg="5">
                        <Label for="bloodPressure">Blood Pressure</Label>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input
                            onChange={this.onChange}
                            type="text"
                            id="bloodPressure"
                            name="bloodPressure"
                            placeholder="Enter blood pressure"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col lg="5">
                        <Label for="pulseRate">Pulse Rate</Label>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input
                            onChange={this.onChange}
                            type="text"
                            id="pulseRate"
                            name="pulseRate"
                            placeholder="Enter pulse rate"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Row>
                      <Col lg="5">
                        <Label for="respiratoryRate">Respiratory Rate</Label>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input
                            onChange={this.onChange}
                            type="text"
                            id="respiratoryRate"
                            name="respiratoryRate"
                            placeholder="Enter respiratory rate"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col lg="5">
                        <Label for="temperature">Temperature</Label>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Input
                            onChange={this.onChange}
                            type="text"
                            id="temperature"
                            name="temperature"
                            placeholder="Enter temperature"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ borderBottomStyle: "solid", paddingTop: "10px" }}>
              <Col lg="2">
                <FormGroup className="dataDesign">
                  Physical Examination
                </FormGroup>
              </Col>
              <Col>
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="heent">HEENT</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="heent"
                        id="heent"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="heart">Heart</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="heart"
                        id="heart"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="lungs">Lungs</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="lungs"
                        id="lungs"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="abdomen">Abdomen</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="abdomen"
                        id="abdomen"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="extremities">Extremities</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="extremities"
                        id="extremities"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ paddingTop: "10px" }}>
              <Col lg="2">
                <FormGroup className="dataDesign">Laboratory Workups</FormGroup>
              </Col>
              <Col>
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="completeBloodCount">
                        Complete Blood Count(CBC)
                      </Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="completeBloodCount"
                        id="completeBloodCount"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="urinalysis">Urinalysis</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="urinalysis"
                        id="urinalysis"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="fecalysis">Fecalysis</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="fecalysis"
                        id="fecalysis"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="chestXray">Chest X-ray(CXR)</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="chestXray"
                        id="chestXray"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="isihiraTest">Ishihara Test</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="isihiraTest"
                        id="isihiraTest"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="audio">Audio</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="audio"
                        id="audio"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="psychologicalExam">Psychological Exam</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="psychologicalExam"
                        id="psychologicalExam"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="drugTest">Drug Test</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="drugTest"
                        id="drugTest"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <Label for="hepatitisBTest">Hepatitis B Test</Label>
                      <Input
                        onChange={this.onChange}
                        type="textarea"
                        name="hepatitisBTest"
                        id="hepatitisBTest"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <br />
          <Container className="div2" style={{ paddingTop: "10px" }}>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <Label className="dataDesign" for="complaints">
                    Complaints
                  </Label>
                  <Input
                    onChange={this.onChange}
                    type="textarea"
                    name="complaints"
                    id="complaints"
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <Label className="dataDesign" for="diagnosis">
                    Diagnosis
                  </Label>
                  <Input
                    onChange={this.onChange}
                    type="textarea"
                    name="diagnosis"
                    id="diagnosis"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <FormGroup>
                  <Label className="dataDesign" for="treatment">
                    Treatment
                  </Label>
                  <Input
                    onChange={this.onChange}
                    type="textarea"
                    name="treatment"
                    id="treatment"
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <Label className="dataDesign" for="remarks">
                    Remarks
                  </Label>
                  <Input
                    onChange={this.onChange}
                    type="textarea"
                    name="remarks"
                    id="remarks"
                  />
                </FormGroup>
              </Col>
            </Row>
          </Container>
          <div>
            <Button
              className="fixedright1"
              color="primary"
              style={{
                marginTop: "1.5rem",
                borderRadius: "40px",
                width: "100px"
              }}
              onClick={this.toggle2}
            >
              <b>Insert</b>
            </Button>
            <Modal
              style={{ textAlign: "center" }}
              centered
              isOpen={this.state.modal2}
              modalTransition={{ timeout: 700 }}
              backdropTransition={{ timeout: 1300 }}
              toggle2={this.toggle2}
              size="md"
            >
              <ModalHeader style={{ justifyContent: "center" }}>
                <h2 className="dataDesign">Insert Record?</h2>
              </ModalHeader>
              <ModalBody>
                <h5>
                  You can't edit this record once you click insert. Are you
                  sure?
                </h5>
              </ModalBody>
              <ModalFooter style={{ justifyContent: "center" }}>
                <Button
                  color="secondary"
                  style={{
                    fontWeight: "bold",
                    height: "40px",
                    borderRadius: "20px",
                    width: "100px"
                  }}
                  onClick={this.toggle2}
                >
                  <b>Go back</b>
                </Button>
                <Button
                  color="primary"
                  style={{
                    fontWeight: "bold",
                    borderRadius: "20px",
                    width: "100px",
                    height: "40px"
                  }}
                  onClick={this.onSubmit}
                  disabled={this.state.loading}
                >
                  {this.state.loading ? (
                    <CircularProgress color="light" size="25px" />
                  ) : (
                    "Insert"
                  )}
                </Button>
              </ModalFooter>
            </Modal>
            <NavLink href="/records" className="logout">
              <b>Cancel</b>
            </NavLink>
          </div>
        </Container>
      </Form>
    );
  }
}
const mapStateToProps = (state) => ({
  medrec: state.medrec
});

export default connect(mapStateToProps, { insertRecord })(InsertMedicalRecords);
