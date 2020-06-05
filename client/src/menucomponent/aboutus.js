import React from "react";
import { Col, Row } from "reactstrap";

function About(props) {
  return (
    <div style={{ marginLeft: "10%", marginTop: "3%" }}>
      <h2 className="dataDesign">About Us</h2>
      <div className="about">
        <Row md="3">
          <Col>
            <img className="img3" src="/images/Angeles.png" alt="Icon" />
            <div className="center">
              <p>
                <b>Alfonso Martin B. Angeles</b>
                <br />
                Blockchain & Backend Developer
              </p>
            </div>
          </Col>
          <Col>
            <img className="img3" src="/images/Azores.png" alt="Icon" />
            <div className="center">
              <p>
                <b>Richard M. Azores</b>
                <br />
                Frontend Developer
              </p>
            </div>
          </Col>
          <Col>
            <img className="img3" src="/images/Faderugao.png" alt="Icon" />
            <div className="center">
              <p>
                <b>Raniel Andri P. Faderugao</b>
                <br />
                System Analyst
              </p>
            </div>
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <img className="img3" src="/images/Limasin.png" alt="Icon" />
            <div className="center">
              <p>
                <b>Marcfrance C. Limasin</b>
                <br />
                Frontend Developer
              </p>
            </div>
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <img className="img3" src="/images/Miguel.png" alt="Icon" />
            <div className="center">
              <p>
                <b>Destiny G. Miguel</b>
                <br />
                Researcher{" "}
              </p>
            </div>
          </Col>
          <Col style={{ marginTop: "10px" }}>
            <img className="img3" src="/images/Ramos.png" alt="Icon" />
            <div className="center">
              <p>
                <b>Noel Earl G. Ramos</b>
                <br />
                Frontend Developer
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default About;
