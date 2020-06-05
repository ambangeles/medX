import React from "react";
import { MdAddCircle } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
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
  CustomInput,
  NavLink,
  Button,
  Alert
} from "reactstrap";
import uuid from "uuid";
import { connect } from "react-redux";
import { insertHistory } from "../../actions/blockchainActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import { clearErrors } from "../../actions/errorActions";

class InsertMedical extends React.Component {
  state = {
    msg: "",
    loading: false,
    modal2: false,
    mumps: false,
    bronchialAsthma: false,
    es: false,
    measles: false,
    typhoidFever: false,
    psychiatricIllness: false,
    chickenPox: false,
    diabetes: false,
    hepatitis: false,
    syncope: false,
    heartCondition: false,
    amoebiasis: false,
    tuberculosis: false,
    hbPressure: false,
    heartCondition1: false,
    hepatitis1: false,
    diabetes1: false,
    hbPressure1: false,
    amoebiasis1: false,
    typhoidFever1: false,
    es1: false,
    tuberculosis1: false,
    malaria: false,
    malaria1: false,
    psychiatricIllness1: false,
    bronchialAsthma1: false,
    food: false,
    skin: false,
    dust: false,
    sting: false,
    pet: false,
    drug: false,
    eye: false,
    ar: false,
    latex: false,
    mold: false,
    sinus: false,
    cockroach: false,
    tattoo: false,
    piercing: false,
    smoking: false,
    alcoholDrinking: false,
    bcg: false,
    chickenPox1: false,
    hpv: false,
    a: false,
    b: false,
    mmr: false,
    tetanus: false,
    eyeGlasses: false,
    contactLenses: false,
    pastIllness: [],
    famIllness: [],
    allergies: [],
    bodyArt: [],
    habits: [],
    immunization: [],
    hospitalizations: [],
    operations: [],
    medication: [],
    visualAcuity: [],
    entries: "",
    height: "",
    weight: "",
    bloodType: "",
    menarchYear: "",
    menarchAge: "",
    mensDuration: "",
    dysmennorrhea: ""
  };

  componentDidMount() {
    const { history } = this.props.medrec;
    if (history) {
      this.setState({
        pastIllness: history.pastIllness,
        famIllness: history.famIllness,
        allergies: history.allergies,
        bodyArt: history.bodyArt,
        habits: history.habits,
        immunization: history.immunization,
        operations: history.operations,
        medication: history.medication,
        visualAcuity: history.visualAcuity,
        hospitalizations: history.hospitalizations,
        height: history.height,
        weight: history.weight,
        bloodType: history.bloodType,
        menarchYear: history.menarchYear,
        menarchAge: history.menarchAge,
        mensDuration: history.mensDuration,
        dysmennorrhea: history.dysmennorrhea
      });
      history.pastIllness.map((name, remarks) => {
        if (
          history.pastIllness[
            history.pastIllness.findIndex((test) => test.name === name.name)
          ].name === name.name
        ) {
          switch (name.name) {
            case "Mumps":
              this.setState({ mumps: !this.state.mumps });
              break;
            case "Bronchial Asthma":
              this.setState({ bronchialAsthma: !this.state.bronchialAsthma });
              break;
            case "Epilepsy/Seizure":
              this.setState({ es: !this.state.es });
              break;
            case "Measles":
              this.setState({ measles: !this.state.measles });
              break;
            case "Typhoid Fever":
              this.setState({ typhoidFever: !this.state.typhoidFever });
              break;
            case "Psychiatric Illness":
              this.setState({
                psychiatricIllness: !this.state.psychiatricIllness
              });
              break;
            case "Chicken Pox":
              this.setState({ chickenPox: !this.state.chickenPox });
              break;
            case "Diabetes":
              this.setState({ diabetes: !this.state.diabetes });
              break;
            case "Hepatitis":
              this.setState({ hepatitis: !this.state.hepatitis });
              break;
            case "Syncope":
              this.setState({ syncope: !this.state.syncope });
              break;
            case "Heart Condition":
              this.setState({ heartCondition: !this.state.heartCondition });
              break;
            case "Amoebiasis":
              this.setState({ amoebiasis: !this.state.amoebiasis });
              break;
            case "Tuberculosis":
              this.setState({ tuberculosis: !this.state.tuberculosis });
              break;
            case "High Blood Pressure":
              this.setState({ hbPressure: !this.state.hbPressure });
              break;
            case "Malaria":
              this.setState({ malaria: !this.state.malaria });
              break;
            default:
              break;
          }
        }
      });
      history.famIllness.map((name, remarks) => {
        if (
          history.famIllness[
            history.famIllness.findIndex((test) => test.name === name.name)
          ].name === name.name
        ) {
          switch (name.name) {
            case "Heart Condition":
              this.setState({ heartCondition1: !this.state.heartCondition1 });
              break;
            case "Bronchial Asthma":
              this.setState({
                bronchialAsthma1: !this.state.bronchialAsthma1
              });
              break;
            case "Epilepsy/Seizure":
              this.setState({ es1: !this.state.es1 });
              break;
            case "Typhoid Fever":
              this.setState({ typhoidFever1: !this.state.typhoidFever1 });
              break;
            case "Psychiatric Illness":
              this.setState({
                psychiatricIllness1: !this.state.psychiatricIllness1
              });
              break;
            case "Chicken Pox":
              this.setState({ chickenPox: !this.state.chickenPox });
              break;
            case "Diabetes":
              this.setState({ diabetes1: !this.state.diabetes1 });
              break;
            case "Hepatitis":
              this.setState({ hepatitis1: !this.state.hepatitis1 });
              break;
            case "Amoebiasis":
              this.setState({ amoebiasis1: !this.state.amoebiasis1 });
              break;
            case "Tuberculosis":
              this.setState({ tuberculosis1: !this.state.tuberculosis1 });
              break;
            case "High Blood Pressure":
              this.setState({ hbPressure1: !this.state.hbPressure1 });
              break;
            case "Malaria":
              this.setState({ malaria1: !this.state.malaria1 });
              break;
            default:
              break;
          }
        }
      });
      history.immunization.map((name, remarks) => {
        if (
          history.immunization[
            history.immunization.findIndex((test) => test.name === name.name)
          ].name === name.name
        ) {
          switch (name.name) {
            case "BCG":
              this.setState({
                bcg: !this.state.bcg
              });
              break;
            case "HPV":
              this.setState({
                hpv: !this.state.hpv
              });
              break;
            case "MMR":
              this.setState({ mmr: !this.state.mmr });
              break;
            case "Anti-Tetanus":
              this.setState({ tetanus: !this.state.tetanus });
              break;
            case "Chicken Pox":
              this.setState({
                chickenPox1: !this.state.chickenPox1
              });
              break;
            case "Hepatitis A":
              this.setState({ a: !this.state.a });
              break;
            case "Hepatitis B":
              this.setState({ b: !this.state.b });
              break;
            default:
              break;
          }
        }
      });
      history.allergies.map((name, remarks) => {
        if (
          history.allergies[
            history.allergies.findIndex((test) => test.name === name.name)
          ].name === name.name
        ) {
          switch (name.name) {
            case "Food Allergy":
              this.setState({ food: !this.state.food });
              break;
            case "Skin Allergy":
              this.setState({ skin: !this.state.skin });
              break;
            case "Dust Allergy":
              this.setState({ dust: !this.state.dust });
              break;
            case "Insect Sting Allergy":
              this.setState({ sting: !this.state.sting });
              break;
            case "Pet Allergy":
              this.setState({ pet: !this.state.pet });
              break;
            case "Drug Allergy":
              this.setState({
                drug: !this.state.drug
              });
              break;
            case "Eye Allergy":
              this.setState({ eye: !this.state.eye });
              break;
            case "Allergic Rhinitis":
              this.setState({ ar: !this.state.ar });
              break;
            case "Latex Allergy":
              this.setState({ latex: !this.state.latex });
              break;
            case "Mold Allergy":
              this.setState({ mold: !this.state.mold });
              break;
            case "Sinus Allergy":
              this.setState({ sinus: !this.state.sinus });
              break;
            case "Cockroach Allergy":
              this.setState({ cockroach: !this.state.cockroach });
              break;
            default:
              break;
          }
        }
      });
      history.bodyArt.map((name, remarks) => {
        if (
          history.bodyArt[
            history.bodyArt.findIndex((test) => test.name === name.name)
          ].name === name.name
        ) {
          switch (name.name) {
            case "Tattoo":
              this.setState({ tattoo: !this.state.tattoo });
              break;
            case "Piercing":
              this.setState({ piercing: !this.state.piercing });
              break;

            default:
              break;
          }
        }
      });
      history.habits.map((name, remarks) => {
        if (
          history.habits[
            history.habits.findIndex((test) => test.name === name.name)
          ].name === name.name
        ) {
          switch (name.name) {
            case "Smoking":
              this.setState({ smoking: !this.state.smoking });
              break;
            case "Alcohol Drinking":
              this.setState({ alcoholDrinking: !this.state.alcoholDrinking });
              break;

            default:
              break;
          }
        }
      });
      history.visualAcuity.map((name, remarks) => {
        if (
          history.visualAcuity[
            history.visualAcuity.findIndex((test) => test.name === name.name)
          ].name === name.name
        ) {
          switch (name.name) {
            case "Eye Glasses":
              this.setState({ eyeGlasses: !this.state.eyeGlasses });
              break;
            case "Contact Lenses":
              this.setState({
                contactLenses: !this.state.contactLenses
              });
              break;

            default:
              break;
          }
        }
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "MEDHIS_INSERTED_FAIL") {
        this.setState({ msg: error.msg.msg, loading: false });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  toggle2 = () => {
    this.setState({ modal2: !this.state.modal2 });
    this.props.clearErrors();
  };

  addEntries = () => {
    this.setState({
      hospitalizations: [
        ...this.state.hospitalizations,
        { id: uuid.v4(), entry: "" }
      ]
    });
  };

  addEntries1 = () => {
    this.setState({
      operations: [...this.state.operations, { id: uuid.v4(), entry: "" }]
    });
  };
  addEntries2 = () => {
    this.setState({
      medication: [...this.state.medication, { id: uuid.v4(), entry: "" }]
    });
  };

  deleteEntries = (id) => {
    this.setState({
      hospitalizations: [
        ...this.state.hospitalizations.filter((entry) => entry.id !== id)
      ]
    });
  };
  deleteEntries1 = (id) => {
    this.setState({
      operations: [...this.state.operations.filter((entry) => entry.id !== id)]
    });
  };
  deleteEntries2 = (id) => {
    this.setState({
      medication: [...this.state.medication.filter((entry) => entry.id !== id)]
    });
  };

  checkBox = (e) => {
    this.setState({
      [e.target.id]: !JSON.parse(e.target.value)
    });
    const name = e.target.id;

    if (this.state[name] === false) {
      this.setState({
        pastIllness: [
          ...this.state.pastIllness,
          {
            name: e.target.name,
            remarks: ""
          }
        ]
      });
    } else if (this.state[name] === true) {
      this.state.pastIllness.splice(
        this.state.pastIllness.findIndex((test) => test.name === e.target.name),
        1
      );
    }
  };

  checkBox1 = (e) => {
    this.setState({
      [e.target.id]: !JSON.parse(e.target.value)
    });
    const name = e.target.id;

    if (this.state[name] === false) {
      this.setState({
        famIllness: [
          ...this.state.famIllness,
          {
            name: e.target.name,
            remarks: ""
          }
        ]
      });
    } else if (this.state[name] === true) {
      this.state.famIllness.splice(
        this.state.famIllness.findIndex((test) => test.name === e.target.name),
        1
      );
    }
  };
  checkBox2 = (e) => {
    this.setState({
      [e.target.id]: !JSON.parse(e.target.value)
    });
    const name = e.target.id;

    if (this.state[name] === false) {
      this.setState({
        allergies: [
          ...this.state.allergies,
          {
            name: e.target.name,
            remarks: ""
          }
        ]
      });
    } else if (this.state[name] === true) {
      this.state.allergies.splice(
        this.state.allergies.findIndex((test) => test.name === e.target.name),
        1
      );
    }
  };
  checkBox3 = (e) => {
    this.setState({
      [e.target.id]: !JSON.parse(e.target.value)
    });
    const name = e.target.id;

    if (this.state[name] === false) {
      this.setState({
        bodyArt: [
          ...this.state.bodyArt,
          {
            name: e.target.name,
            remarks: ""
          }
        ]
      });
    } else if (this.state[name] === true) {
      this.state.bodyArt.splice(
        this.state.bodyArt.findIndex((test) => test.name === e.target.name),
        1
      );
    }
  };
  checkBox4 = (e) => {
    this.setState({
      [e.target.id]: !JSON.parse(e.target.value)
    });
    const name = e.target.id;

    if (this.state[name] === false) {
      this.setState({
        habits: [
          ...this.state.habits,
          {
            name: e.target.name,
            remarks: ""
          }
        ]
      });
    } else if (this.state[name] === true) {
      this.state.habits.splice(
        this.state.habits.findIndex((test) => test.name === e.target.name),
        1
      );
    }
  };

  checkBox5 = (e) => {
    this.setState({
      [e.target.id]: !JSON.parse(e.target.value)
    });
    const name = e.target.id;

    if (this.state[name] === false) {
      this.setState({
        immunization: [
          ...this.state.immunization,
          {
            name: e.target.name
          }
        ]
      });
    } else if (this.state[name] === true) {
      this.state.immunization.splice(
        this.state.immunization.findIndex(
          (test) => test.name === e.target.name
        ),
        1
      );
    }
  };

  checkBox6 = (e) => {
    this.setState({
      [e.target.id]: !JSON.parse(e.target.value)
    });
    const name = e.target.id;

    if (this.state[name] === false) {
      this.setState({
        visualAcuity: [
          ...this.state.visualAcuity,
          {
            name: e.target.name,
            od: "",
            os: "",
            date: ""
          }
        ]
      });
    } else if (this.state[name] === true) {
      this.state.visualAcuity.splice(
        this.state.visualAcuity.findIndex(
          (test) => test.name === e.target.name
        ),
        1
      );
    }
  };

  od = (e) => {
    let visualAcuity = JSON.parse(JSON.stringify(this.state.visualAcuity));
    visualAcuity[
      visualAcuity.findIndex((test) => test.name === e.target.name)
    ].od = e.target.value;

    this.setState({
      visualAcuity
    });
  };
  os = (e) => {
    let visualAcuity = JSON.parse(JSON.stringify(this.state.visualAcuity));
    visualAcuity[
      visualAcuity.findIndex((test) => test.name === e.target.name)
    ].os = e.target.value;
    this.setState({
      visualAcuity
    });
  };
  date = (e) => {
    let visualAcuity = JSON.parse(JSON.stringify(this.state.visualAcuity));
    visualAcuity[
      visualAcuity.findIndex((test) => test.name === e.target.name)
    ].date = e.target.value;
    this.setState({
      visualAcuity
    });
  };

  remarks = (e) => {
    let pastIllness = JSON.parse(JSON.stringify(this.state.pastIllness));
    pastIllness[
      pastIllness.findIndex((test) => test.name === e.target.name)
    ].remarks = e.target.value;

    this.setState({
      pastIllness
    });
  };

  remarks1 = (e) => {
    let famIllness = JSON.parse(JSON.stringify(this.state.famIllness));
    famIllness[
      famIllness.findIndex((test) => test.name === e.target.name)
    ].remarks = e.target.value;

    this.setState({
      famIllness
    });
  };
  remarks2 = (e) => {
    let allergies = JSON.parse(JSON.stringify(this.state.allergies));
    allergies[
      allergies.findIndex((test) => test.name === e.target.name)
    ].remarks = e.target.value;

    this.setState({
      allergies
    });
  };
  remarks3 = (e) => {
    let bodyArt = JSON.parse(JSON.stringify(this.state.bodyArt));
    bodyArt[bodyArt.findIndex((test) => test.name === e.target.name)].remarks =
      e.target.value;

    this.setState({
      bodyArt
    });
  };
  remarks4 = (e) => {
    let habits = JSON.parse(JSON.stringify(this.state.habits));
    habits[habits.findIndex((test) => test.name === e.target.name)].remarks =
      e.target.value;

    this.setState({
      habits
    });
  };

  entry = (e) => {
    let hospitalizations = JSON.parse(
      JSON.stringify(this.state.hospitalizations)
    );
    hospitalizations[
      hospitalizations.findIndex((entry) => entry.id === e.target.id)
    ].entry = e.target.value;

    this.setState({
      hospitalizations
    });
  };
  entry1 = (e) => {
    let operations = JSON.parse(JSON.stringify(this.state.operations));
    operations[
      operations.findIndex((entry) => entry.id === e.target.id)
    ].entry = e.target.value;

    this.setState({
      operations
    });
  };
  entry2 = (e) => {
    let medication = JSON.parse(JSON.stringify(this.state.medication));
    medication[
      medication.findIndex((entry) => entry.id === e.target.id)
    ].entry = e.target.value;

    this.setState({
      medication
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  setD = (e) => {
    this.setState({ dysmennorrhea: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const {
      pastIllness,
      famIllness,
      immunization,
      hospitalizations,
      operations,
      allergies,
      medication,
      bloodType,
      height,
      weight,
      bodyArt,
      habits,
      visualAcuity,
      menarchYear,
      menarchAge,
      mensDuration,
      dysmennorrhea
    } = this.state;
    const history = {
      pastIllness,
      famIllness,
      immunization,
      hospitalizations,
      operations,
      allergies,
      medication,
      bloodType,
      height,
      weight,
      bodyArt,
      habits,
      visualAcuity,
      menarchYear,
      menarchAge,
      mensDuration,
      dysmennorrhea
    };
    this.props.insertHistory(
      history,
      this.props.medrec.viewId,
      this.props.medrec.shareToken
    );
  };

  render() {
    if (this.props.medrec.msg === "MEDHIS_INSERTED_SUCCESS") {
      window.location.assign("/medicalhistory");
    }

    return (
      <Form>
        <Container>
          <h2 className="dataDesign">Update Medical History</h2>

          <Label>
            <h5 className="dataDesign">History of Past Illness</h5>
          </Label>
          <div className="bgInsert">
            <Row>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="mumps"
                    label="Mumps"
                    name="Mumps"
                    value={this.state.mumps}
                    onChange={this.checkBox}
                    checked={this.state.mumps}
                  />
                  {this.state.mumps === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="mumps"
                      placeholder="Remarks"
                      name="Mumps"
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Mumps"
                          )
                        ].remarks
                      }
                      onChange={this.remarks}
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="bronchialAsthma"
                    label="Bronchial Asthma"
                    name="Bronchial Asthma"
                    value={this.state.bronchialAsthma}
                    onChange={this.checkBox}
                    checked={this.state.bronchialAsthma}
                  />
                  {this.state.bronchialAsthma === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="bronchialAsthma"
                      placeholder="Remarks"
                      name="Bronchial Asthma"
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Bronchial Asthma"
                          )
                        ].remarks
                      }
                      onChange={this.remarks}
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="es"
                    label="Epilepsy/Seizure"
                    name="Epilepsy/Seizure"
                    value={this.state.es}
                    onChange={this.checkBox}
                    checked={this.state.es}
                  />
                  {this.state.es === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="es"
                      placeholder="Remarks"
                      name="Epilepsy/Seizure"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Epilepsy/Seizure"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="measles"
                    label="Measles"
                    name="Measles"
                    value={this.state.measles}
                    onChange={this.checkBox}
                    checked={this.state.measles}
                  />
                  {this.state.measles === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="measles"
                      placeholder="Remarks"
                      name="Measles"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Measles"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="typhoidFever"
                    label="Typhoid Fever"
                    name="Typhoid Fever"
                    value={this.state.typhoidFever}
                    onChange={this.checkBox}
                    checked={this.state.typhoidFever}
                  />
                  {this.state.typhoidFever === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="typhoidFever"
                      placeholder="Remarks"
                      name="Typhoid Fever"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Typhoid Fever"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="psychiatricIllness"
                    label="Psychiatric Illness"
                    name="Psychiatric Illness"
                    value={this.state.psychiatricIllness}
                    onChange={this.checkBox}
                    checked={this.state.psychiatricIllness}
                  />
                  {this.state.psychiatricIllness === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="psychiatricIllness"
                      placeholder="Remarks"
                      name="Psychiatric Illness"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Psychiatric Illness"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="chickenPox"
                    label="Chicken Pox"
                    name="Chicken Pox"
                    value={this.state.chickenPox}
                    onChange={this.checkBox}
                    checked={this.state.chickenPox}
                  />
                  {this.state.chickenPox === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="chickenPox"
                      placeholder="Remarks"
                      name="Chicken Pox"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Chicken Pox"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="diabetes"
                    label="Diabetes"
                    name="Diabetes"
                    value={this.state.diabetes}
                    onChange={this.checkBox}
                    checked={this.state.diabetes}
                  />
                  {this.state.diabetes === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="diabetes"
                      placeholder="Remarks"
                      name="Diabetes"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Diabetes"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="hepatitis"
                    label="Hepatitis"
                    name="Hepatitis"
                    value={this.state.hepatitis}
                    onChange={this.checkBox}
                    checked={this.state.hepatitis}
                  />
                  {this.state.hepatitis === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="hepatitis"
                      placeholder="Remarks"
                      name="Hepatitis"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Hepatitis"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="syncope"
                    label="Syncope"
                    name="Syncope"
                    value={this.state.syncope}
                    onChange={this.checkBox}
                    checked={this.state.syncope}
                  />
                  {this.state.syncope === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="syncope"
                      placeholder="Remarks"
                      name="Syncope"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Syncope"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="heartCondition"
                    label="Heart Condition"
                    name="Heart Condition"
                    value={this.state.heartCondition}
                    onChange={this.checkBox}
                    checked={this.state.heartCondition}
                  />
                  {this.state.heartCondition === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="heartCondition"
                      placeholder="Remarks"
                      name="Heart Condition"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Heart Condition"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="amoebiasis"
                    label="Amoebiasis"
                    name="Amoebiasis"
                    value={this.state.amoebiasis}
                    onChange={this.checkBox}
                    checked={this.state.amoebiasis}
                  />
                  {this.state.amoebiasis === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="amoebiasis"
                      placeholder="Remarks"
                      name="Amoebiasis"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Amoebiasis"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="tuberculosis"
                    label="Tuberculosis"
                    name="Tuberculosis"
                    value={this.state.tuberculosis}
                    onChange={this.checkBox}
                    checked={this.state.tuberculosis}
                  />
                  {this.state.tuberculosis === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="tuberculosis"
                      placeholder="Remarks"
                      name="Tuberculosis"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Tuberculosis"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="hbPressure"
                    label="High Blood Pressure"
                    name="High Blood Pressure"
                    value={this.state.hbPressure}
                    onChange={this.checkBox}
                    checked={this.state.hbPressure}
                  />
                  {this.state.hbPressure === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="hbPressure"
                      placeholder="Remarks"
                      name="High Blood Pressure"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "High Blood Pressure"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="malaria"
                    label="Malaria"
                    name="Malaria"
                    value={this.state.malaria}
                    onChange={this.checkBox}
                    checked={this.state.malaria}
                  />
                  {this.state.malaria === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="malaria"
                      placeholder="Remarks"
                      name="Malaria"
                      onChange={this.remarks}
                      defaultValue={
                        this.state.pastIllness[
                          this.state.pastIllness.findIndex(
                            (test) => test.name === "Malaria"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
          </div>
          <Label style={{ marginTop: "15px" }}>
            <h5 className="dataDesign">Family History of Illness</h5>
          </Label>
          <div className="bgInsert">
            <Row>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="heartCondition1"
                    label="Heart Condition"
                    name="Heart Condition"
                    value={this.state.heartCondition1}
                    onChange={this.checkBox1}
                    checked={this.state.heartCondition1}
                  />
                  {this.state.heartCondition1 === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="heartCondition1"
                      placeholder="Remarks"
                      name="Heart Condition"
                      onChange={this.remarks1}
                      defaultValue={
                        this.state.famIllness[
                          this.state.famIllness.findIndex(
                            (test) => test.name === "Heart Condition"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="hepatitis1"
                    label="Hepatitis"
                    name="Hepatitis"
                    value={this.state.hepatitis1}
                    onChange={this.checkBox1}
                    checked={this.state.hepatitis1}
                  />
                  {this.state.hepatitis1 === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="hepatitis1"
                      placeholder="Remarks"
                      name="Hepatitis"
                      onChange={this.remarks1}
                      defaultValue={
                        this.state.famIllness[
                          this.state.famIllness.findIndex(
                            (test) => test.name === "Hepatitis"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>{" "}
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="diabetes1"
                    label="Diabetes"
                    name="Diabetes"
                    value={this.state.diabetes1}
                    onChange={this.checkBox1}
                    checked={this.state.diabetes1}
                  />
                  {this.state.diabetes1 === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="diabetes1"
                      placeholder="Remarks"
                      name="Diabetes"
                      onChange={this.remarks1}
                      defaultValue={
                        this.state.famIllness[
                          this.state.famIllness.findIndex(
                            (test) => test.name === "Diabetes"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="hbPressure1"
                    label="High Blood Pressure"
                    name="High Blood Pressure"
                    value={this.state.hbPressure1}
                    onChange={this.checkBox1}
                    checked={this.state.hbPressure1}
                  />
                  {this.state.hbPressure1 === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="hbPressure1"
                      placeholder="Remarks"
                      name="High Blood Pressure"
                      onChange={this.remarks1}
                      defaultValue={
                        this.state.famIllness[
                          this.state.famIllness.findIndex(
                            (test) => test.name === "High Blood Pressure"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="amoebiasis1"
                    label="Amoebiasis"
                    name="Amoebiasis"
                    value={this.state.amoebiasis1}
                    onChange={this.checkBox1}
                    checked={this.state.amoebiasis1}
                  />
                  {this.state.amoebiasis1 === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="amoebiasis1"
                      placeholder="Remarks"
                      name="Amoebiasis"
                      onChange={this.remarks1}
                      defaultValue={
                        this.state.famIllness[
                          this.state.famIllness.findIndex(
                            (test) => test.name === "Amoebiasis"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="typhoidFever1"
                    label="Typhoid Fever"
                    name="Typhoid Fever"
                    value={this.state.typhoidFever1}
                    onChange={this.checkBox1}
                    checked={this.state.typhoidFever1}
                  />
                  {this.state.typhoidFever1 === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="typhoidFever1"
                      placeholder="Remarks"
                      name="Typhoid Fever"
                      onChange={this.remarks1}
                      defaultValue={
                        this.state.famIllness[
                          this.state.famIllness.findIndex(
                            (test) => test.name === "Typhoid Fever"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="es1"
                    label="Epilepsy/Seizure"
                    name="Epilepsy/Seizure"
                    value={this.state.es1}
                    onChange={this.checkBox1}
                    checked={this.state.es1}
                  />
                  {this.state.es1 === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="es1"
                      placeholder="Remarks"
                      name="Epilepsy/Seizure"
                      onChange={this.remarks1}
                      defaultValue={
                        this.state.famIllness[
                          this.state.famIllness.findIndex(
                            (test) => test.name === "Epilepsy/Seizure"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="tuberculosis1"
                    label="Tuberculosis"
                    name="Tuberculosis"
                    value={this.state.tuberculosis1}
                    onChange={this.checkBox1}
                    checked={this.state.tuberculosis1}
                  />
                  {this.state.tuberculosis1 === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="tuberculosis1"
                      placeholder="Remarks"
                      name="Tuberculosis"
                      onChange={this.remarks1}
                      defaultValue={
                        this.state.famIllness[
                          this.state.famIllness.findIndex(
                            (test) => test.name === "Tuberculosis"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="malaria1"
                    label="Malaria"
                    name="Malaria"
                    value={this.state.malaria1}
                    onChange={this.checkBox1}
                    checked={this.state.malaria1}
                  />
                  {this.state.malaria1 === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="malaria1"
                      placeholder="Remarks"
                      name="Malaria"
                      onChange={this.remarks1}
                      defaultValue={
                        this.state.famIllness[
                          this.state.famIllness.findIndex(
                            (test) => test.name === "Malaria"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="psychiatricIllness1"
                    label="Psychiatric Illness"
                    name="Psychiatric Illness"
                    value={this.state.psychiatricIllness1}
                    onChange={this.checkBox1}
                    checked={this.state.psychiatricIllness1}
                  />
                  {this.state.psychiatricIllness1 === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="psychiatricIllness1"
                      placeholder="Remarks"
                      name="Psychiatric Illness"
                      onChange={this.remarks1}
                      defaultValue={
                        this.state.famIllness[
                          this.state.famIllness.findIndex(
                            (test) => test.name === "Psychiatric Illness"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
              <Col lg="4">
                <div>
                  <CustomInput
                    className="floaterleft11"
                    type="checkbox"
                    id="bronchialAsthma1"
                    label="Bronchial Asthma"
                    name="Bronchial Asthma"
                    value={this.state.bronchialAsthma1}
                    onChange={this.checkBox1}
                    checked={this.state.bronchialAsthma1}
                  />
                  {this.state.bronchialAsthma1 === true ? (
                    <Input
                      className="Illness"
                      type="remarks"
                      id="bronchialAsthma1"
                      placeholder="Remarks"
                      name="Bronchial Asthma"
                      onChange={this.remarks1}
                      defaultValue={
                        this.state.famIllness[
                          this.state.famIllness.findIndex(
                            (test) => test.name === "Bronchial Asthma"
                          )
                        ].remarks
                      }
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
          </div>
          <Container style={{ marginTop: "15px" }}>
            <FormGroup row>
              <Label className="dataDesign" for="height" sm={1.5}>
                Height(cm)
              </Label>
              <Col sm={2}>
                <Input
                  type="text"
                  name="height"
                  id="height"
                  onChange={this.onChange}
                  value={this.state.height}
                />
              </Col>
              <Label className="dataDesign" for="weight" sm={1.5}>
                Weight(kg)
              </Label>
              <Col sm={2}>
                <Input
                  type="text"
                  name="weight"
                  id="weight"
                  onChange={this.onChange}
                  value={this.state.weight}
                />
              </Col>
              <Label className="dataDesign" for="bloodType" sm={1.5}>
                Blood Type
              </Label>
              <Col sm={2}>
                <Input
                  type="text"
                  name="bloodType"
                  id="bloodType"
                  value={this.state.bloodType}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
          </Container>
          <Row>
            <Col style={{ marginTop: "10px" }} lg="4">
              <div className="bgInsert">
                <MdAddCircle
                  size="30px"
                  style={{
                    marginRight: "2px",
                    float: "left"
                  }}
                  color="rgb(0,123,256)"
                  onClick={this.addEntries2}
                />
                <Label className="dataDesign" style={{ fontSize: "20px" }}>
                  Medical History
                </Label>
                <FormGroup>
                  {this.state.medication.map((entry, index) => (
                    <div style={{ margin: "5px 5px" }} key={entry.id}>
                      {!this.state.medication[index].entry ? (
                        <FaMinus
                          color="red"
                          style={{ float: "right" }}
                          onClick={this.deleteEntries2.bind(this, entry.id)}
                        />
                      ) : null}
                      <Input
                        type="textarea"
                        name={entry.id}
                        id={entry.id}
                        onChange={this.entry2}
                        defaultValue={this.state.medication[index].entry}
                      />
                    </div>
                  ))}
                </FormGroup>
              </div>
            </Col>
            <Col style={{ marginTop: "10px" }} lg="4">
              <div className="bgInsert">
                <Label className="dataDesign" style={{ fontSize: "20px" }}>
                  Hospitalizations
                  <MdAddCircle
                    size="30px"
                    style={{
                      marginRight: "2px",
                      float: "left"
                    }}
                    color="rgb(0,123,256)"
                    onClick={this.addEntries}
                  />
                </Label>
                <FormGroup>
                  {this.state.hospitalizations.map((entry, index) => (
                    <div style={{ margin: "5px 5px" }} key={entry.id}>
                      {!this.state.hospitalizations[index].entry ? (
                        <FaMinus
                          color="red"
                          style={{ float: "right" }}
                          onClick={this.deleteEntries.bind(this, entry.id)}
                        />
                      ) : null}
                      <Input
                        type="textarea"
                        name={entry.id}
                        id={entry.id}
                        onChange={this.entry}
                        defaultValue={this.state.hospitalizations[index].entry}
                      />
                    </div>
                  ))}
                </FormGroup>
              </div>
            </Col>
            <Col style={{ marginTop: "10px" }} lg="4">
              <div className="bgInsert">
                <Label className="dataDesign" style={{ fontSize: "20px" }}>
                  Operations
                  <MdAddCircle
                    size="30px"
                    style={{
                      marginRight: "2px",
                      float: "left"
                    }}
                    color="rgb(0,123,256)"
                    onClick={this.addEntries1}
                  />
                </Label>
                <FormGroup>
                  {this.state.operations.map((entry, index) => (
                    <div style={{ margin: "5px 5px" }} key={entry.id}>
                      {!this.state.operations[index].entry ? (
                        <FaMinus
                          color="red"
                          style={{ float: "right" }}
                          onClick={this.deleteEntries1.bind(this, entry.id)}
                        />
                      ) : null}
                      <Input
                        type="textarea"
                        name={entry.id}
                        id={entry.id}
                        onChange={this.entry1}
                        defaultValue={this.state.operations[index].entry}
                      />
                    </div>
                  ))}
                </FormGroup>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Label style={{ marginTop: "15px" }}>
                <h5 className="dataDesign">Immunization</h5>
              </Label>
              <div className="bgInsert">
                <Row>
                  <Col lg="3">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="bcg"
                      label="BCG"
                      name="BCG"
                      value={this.state.bcg}
                      onChange={this.checkBox5}
                      checked={this.state.bcg}
                    />
                  </Col>
                  <Col>
                    <CustomInput
                      className="floaterright11"
                      type="checkbox"
                      id="chickenPox1"
                      label="Chicken Pox"
                      name="Chicken Pox"
                      value={this.state.chickenPox1}
                      onChange={this.checkBox5}
                      checked={this.state.chickenPox1}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg="3">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="mmr"
                      label="MMR"
                      name="MMR"
                      value={this.state.mmr}
                      onChange={this.checkBox5}
                      checked={this.state.mmr}
                    />
                  </Col>
                  <Col>
                    <CustomInput
                      className="floaterright11"
                      type="checkbox"
                      id="a"
                      label="Hepatitis A"
                      name="Hepatitis A"
                      value={this.state.a}
                      onChange={this.checkBox5}
                      checked={this.state.a}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg="3">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="hpv"
                      label="HPV"
                      name="HPV"
                      value={this.state.hpv}
                      onChange={this.checkBox5}
                      checked={this.state.hpv}
                    />
                  </Col>
                  <Col>
                    <CustomInput
                      className="floaterright11"
                      type="checkbox"
                      id="b"
                      label="Hepatitis B"
                      name="Hepatitis B"
                      value={this.state.b}
                      onChange={this.checkBox5}
                      checked={this.state.b}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="tetanus"
                      label="Anti-Tetanus"
                      name="Anti-Tetanus"
                      value={this.state.tetanus}
                      onChange={this.checkBox5}
                      checked={this.state.tetanus}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col>
              <Label style={{ marginTop: "15px" }}>
                <h5 className="dataDesign">Allergies</h5>
              </Label>
              <Col className="bgInsert">
                <Row>
                  <Col lg="6">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="food"
                      label="Food Allergy"
                      name="Food Allergy"
                      value={this.state.food}
                      onChange={this.checkBox2}
                      checked={this.state.food}
                    />
                    {this.state.food === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="food"
                        placeholder="Remarks"
                        name="Food Allergy"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Food Allergy"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                  <Col lg="6">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="eye"
                      label="Eye Allergy"
                      name="Eye Allergy"
                      value={this.state.eye}
                      onChange={this.checkBox2}
                      checked={this.state.eye}
                    />
                    {this.state.eye === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="eye"
                        placeholder="Remarks"
                        name="Eye Allergy"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Eye Allergy"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="skin"
                      label="Skin Allergy"
                      name="Skin Allergy"
                      value={this.state.skin}
                      onChange={this.checkBox2}
                      checked={this.state.skin}
                    />
                    {this.state.skin === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="skin"
                        placeholder="Remarks"
                        name="Skin Allergy"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Skin Allergy"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                  <Col lg="6">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="ar"
                      label="Allergic Rhinitis"
                      name="Allergic Rhinitis"
                      value={this.state.ar}
                      onChange={this.checkBox2}
                      checked={this.state.ar}
                    />
                    {this.state.ar === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="ar"
                        placeholder="Remarks"
                        name="Allergic Rhinitis"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Allergic Rhinitis"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="dust"
                      label="Dust Allergy"
                      name="Dust Allergy"
                      value={this.state.dust}
                      onChange={this.checkBox2}
                      checked={this.state.dust}
                    />
                    {this.state.dust === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="dust"
                        placeholder="Remarks"
                        name="Dust Allergy"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Dust Allergy"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                  <Col lg="6">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="latex"
                      label="Latex Allergy"
                      name="Latex Allergy"
                      value={this.state.latex}
                      onChange={this.checkBox2}
                      checked={this.state.latex}
                    />
                    {this.state.latex === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="latex"
                        placeholder="Remarks"
                        name="Latex Allergy"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Latex Allergy"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {" "}
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="sting"
                      label="Insect Sting Allergy"
                      name="Insect Sting Allergy"
                      value={this.state.sting}
                      onChange={this.checkBox2}
                      checked={this.state.sting}
                    />
                    {this.state.sting === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="sting"
                        placeholder="Remarks"
                        name="Insect Sting Allergy"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Insect Sting Allergy"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                  <Col lg="6">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="mold"
                      label="Mold Allergy"
                      name="Mold Allergy"
                      value={this.state.mold}
                      onChange={this.checkBox2}
                      checked={this.state.mold}
                    />
                    {this.state.mold === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="mold"
                        placeholder="Remarks"
                        name="Mold Allergy"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Mold Allergy"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="pet"
                      label="Pet Allergy"
                      name="Pet Allergy"
                      value={this.state.pet}
                      onChange={this.checkBox2}
                      checked={this.state.pet}
                    />
                    {this.state.pet === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="pet"
                        placeholder="Remarks"
                        name="Pet Allergy"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Pet Allergy"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                  <Col lg="6">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="sinus"
                      label="Sinus Allergy"
                      name="Sinus Allergy"
                      value={this.state.sinus}
                      onChange={this.checkBox2}
                      checked={this.state.sinus}
                    />
                    {this.state.sinus === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="sinus"
                        placeholder="Remarks"
                        name="Sinus Allergy"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Sinus Allergy"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="drug"
                      label="Drug Allergy"
                      name="Drug Allergy"
                      value={this.state.drug}
                      onChange={this.checkBox2}
                      checked={this.state.drug}
                    />
                    {this.state.drug === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="drug"
                        placeholder="Remarks"
                        name="Drug Allergy"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Drug Allergy"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                  <Col lg="6">
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="cockroach"
                      label="Cockroach Allergy"
                      name="Cockroach Allergy"
                      value={this.state.cockroach}
                      onChange={this.checkBox2}
                      checked={this.state.cockroach}
                    />
                    {this.state.cockroach === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="cockroach"
                        placeholder="Remarks"
                        name="Cockroach Allergy"
                        onChange={this.remarks2}
                        defaultValue={
                          this.state.allergies[
                            this.state.allergies.findIndex(
                              (test) => test.name === "Cockroach Allergy"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                </Row>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Label style={{ marginTop: "15px" }}>
                <h5 className="dataDesign">Body Art</h5>
              </Label>
              <div className="bgInsert">
                <Row>
                  <Col>
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="tattoo"
                      label="Tattoo"
                      name="Tattoo"
                      value={this.state.tattoo}
                      onChange={this.checkBox3}
                      checked={this.state.tattoo}
                    />
                    {this.state.tattoo === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="tattoo"
                        placeholder="Remarks"
                        name="Tattoo"
                        onChange={this.remarks3}
                        defaultValue={
                          this.state.bodyArt[
                            this.state.bodyArt.findIndex(
                              (test) => test.name === "Tattoo"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="piercing"
                      label="Piercing"
                      name="Piercing"
                      value={this.state.piercing}
                      onChange={this.checkBox3}
                      checked={this.state.piercing}
                    />
                    {this.state.piercing === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="piercing"
                        placeholder="Remarks"
                        name="Piercing"
                        onChange={this.remarks3}
                        defaultValue={
                          this.state.bodyArt[
                            this.state.bodyArt.findIndex(
                              (test) => test.name === "Piercing"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg="4">
              <Label style={{ marginTop: "15px" }}>
                <h5 className="dataDesign">Perturbing Habits</h5>
              </Label>
              <div className="bgInsert">
                <Row>
                  <Col>
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="smoking"
                      label="Smoking"
                      name="Smoking"
                      value={this.state.smoking}
                      onChange={this.checkBox4}
                      checked={this.state.smoking}
                    />
                    {this.state.smoking === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="smoking"
                        placeholder="Remarks"
                        name="Smoking"
                        onChange={this.remarks4}
                        defaultValue={
                          this.state.habits[
                            this.state.habits.findIndex(
                              (test) => test.name === "Smoking"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <CustomInput
                      className="floaterleft11"
                      type="checkbox"
                      id="alcoholDrinking"
                      label="Alcohol Drinking"
                      name="Alcohol Drinking"
                      value={this.state.alcoholDrinking}
                      onChange={this.checkBox4}
                      checked={this.state.alcoholDrinking}
                    />
                    {this.state.alcoholDrinking === true ? (
                      <Input
                        className="Illness"
                        type="remarks"
                        id="alcoholDrinking"
                        placeholder="Remarks"
                        name="Alcohol Drinking"
                        onChange={this.remarks4}
                        defaultValue={
                          this.state.habits[
                            this.state.habits.findIndex(
                              (test) => test.name === "Alcohol Drinking"
                            )
                          ].remarks
                        }
                      />
                    ) : null}
                  </Col>
                </Row>
              </div>
            </Col>
            {this.props.medrec.view.sex === "Female" ? (
              <Col lg="4">
                <Label style={{ marginTop: "15px" }}>
                  <h5 className="dataDesign">O.B Gyne History</h5>
                </Label>
                <div className="bgInsert">
                  <Row>
                    <Col>
                      <Label className="floaterleft11" for="menarchYear">
                        Menach Year
                      </Label>
                      <Input
                        className="Illness"
                        type="remarks"
                        id="menarchYear"
                        placeholder="Enter year"
                        name="menarchYear"
                        value={this.state.menarchYear}
                        onChange={this.onChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label className="floaterleft11" for="menarchAge">
                        Menach Age
                      </Label>
                      <Input
                        className="Illness"
                        type="remarks"
                        id="menarchAge"
                        placeholder="Enter age"
                        name="menarchAge"
                        value={this.state.menarchAge}
                        onChange={this.onChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label className="floaterleft11" for="mensDuration">
                        Menstruation Duration
                      </Label>
                      <Input
                        className="Illness"
                        type="remarks"
                        id="mensDuration"
                        placeholder="Remarks"
                        name="mensDuration"
                        value={this.state.mensDuration}
                        onChange={this.onChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label className="floaterleft11" for="gyne4">
                        Dysmenorrhea
                      </Label>
                    </Col>
                    <Col>
                      <Form inline onChange={this.setD.bind(this)}>
                        <div>
                          <Input
                            type="radio"
                            value="Yes"
                            name="dysmennorrhea"
                            checked={this.state.dysmennorrhea === "Yes"}
                          />
                          Yes
                        </div>
                        <div style={{ marginLeft: "50px" }}>
                          <Input
                            type="radio"
                            value="No"
                            name="dysmennorrhea"
                            checked={this.state.dysmennorrhea === "No"}
                          />
                          No
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </div>
              </Col>
            ) : null}
          </Row>
          <Row>
            <Col lg="8">
              <Label style={{ marginTop: "15px" }}>
                <h5 className="dataDesign">Visual Acuity</h5>
              </Label>
              <div className="bgInsert">
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <CustomInput
                          className="floaterleft11"
                          type="checkbox"
                          id="eyeGlasses"
                          label="Eye Glasses"
                          name="Eye Glasses"
                          value={this.state.eyeGlasses}
                          onChange={this.checkBox6}
                          checked={this.state.eyeGlasses}
                        />
                      </Col>
                      <Col>
                        {this.state.eyeGlasses === true ? (
                          <Input
                            className="Illness"
                            type="text"
                            id="eyeGlasses"
                            placeholder="OD"
                            name="Eye Glasses"
                            onChange={this.od}
                            defaultValue={
                              this.state.visualAcuity[
                                this.state.visualAcuity.findIndex(
                                  (test) => test.name === "Eye Glasses"
                                )
                              ].od
                            }
                          />
                        ) : null}
                      </Col>
                      <Col>
                        {this.state.eyeGlasses === true ? (
                          <Input
                            className="Illness"
                            type="text"
                            id="eyeGlasses"
                            placeholder="OS"
                            name="Eye Glasses"
                            onChange={this.os}
                            defaultValue={
                              this.state.visualAcuity[
                                this.state.visualAcuity.findIndex(
                                  (test) => test.name === "Eye Glasses"
                                )
                              ].os
                            }
                          />
                        ) : null}
                      </Col>
                      <Col>
                        {this.state.eyeGlasses === true ? (
                          <Input
                            className="Illness"
                            type="text"
                            id="eyeGlasses"
                            placeholder="Date"
                            name="Eye Glasses"
                            onChange={this.date}
                            defaultValue={
                              this.state.visualAcuity[
                                this.state.visualAcuity.findIndex(
                                  (test) => test.name === "Eye Glasses"
                                )
                              ].date
                            }
                          />
                        ) : null}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <CustomInput
                          className="floaterleft11"
                          type="checkbox"
                          id="contactLenses"
                          label="Contact Lenses"
                          name="Contact Lenses"
                          value={this.state.contactLenses}
                          onChange={this.checkBox6}
                          checked={this.state.contactLenses}
                        />
                      </Col>
                      <Col>
                        {this.state.contactLenses === true ? (
                          <Input
                            className="Illness"
                            type="text"
                            id="contactLenses"
                            placeholder="OD"
                            name="Contact Lenses"
                            onChange={this.od}
                            defaultValue={
                              this.state.visualAcuity[
                                this.state.visualAcuity.findIndex(
                                  (test) => test.name === "Contact Lenses"
                                )
                              ].od
                            }
                          />
                        ) : null}
                      </Col>
                      <Col>
                        {this.state.contactLenses === true ? (
                          <Input
                            className="Illness"
                            type="text"
                            id="contactLenses"
                            placeholder="OS"
                            name="Contact Lenses"
                            onChange={this.os}
                            defaultValue={
                              this.state.visualAcuity[
                                this.state.visualAcuity.findIndex(
                                  (test) => test.name === "Contact Lenses"
                                )
                              ].os
                            }
                          />
                        ) : null}
                      </Col>
                      <Col>
                        {this.state.contactLenses === true ? (
                          <Input
                            className="Illness"
                            type="text"
                            id="contactLenses"
                            placeholder="Date"
                            name="Contact Lenses"
                            onChange={this.date}
                            defaultValue={
                              this.state.visualAcuity[
                                this.state.visualAcuity.findIndex(
                                  (test) => test.name === "Contact Lenses"
                                )
                              ].date
                            }
                          />
                        ) : null}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <div>
            <Button
              className="fixedright1"
              color="primary"
              style={{
                marginTop: "1.5rem",
                borderRadius: "50px",
                width: "100px"
              }}
              onClick={this.toggle2}
            >
              <b>Update</b>
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
                <h2 className="dataDesign">Update Medical History?</h2>
              </ModalHeader>
              <ModalBody>
                {this.state.msg ? (
                  <Alert color="danger"> {this.state.msg}</Alert>
                ) : null}
                <h5>
                  You can't edit this medical history once you click update. Are
                  you sure?
                </h5>
              </ModalBody>
              <ModalFooter style={{ justifyContent: "center" }}>
                <Button
                  color="secondary"
                  style={{
                    fontWeight: "bold",
                    height: "40px",
                    borderRadius: "50px",
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
                    height: "40px",
                    borderRadius: "50px",
                    width: "100px"
                  }}
                  onClick={this.onSubmit}
                  disabled={this.state.loading}
                >
                  {this.state.loading ? (
                    <CircularProgress color="light" size="25px" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </ModalFooter>
            </Modal>
            <NavLink href="/medicalhistory" className="logout">
              <b>Cancel</b>
            </NavLink>
          </div>
        </Container>
      </Form>
    );
  }
}
const mapStateToProps = (state) => ({
  medrec: state.medrec,
  error: state.error
});

export default connect(mapStateToProps, { insertHistory, clearErrors })(
  InsertMedical
);
