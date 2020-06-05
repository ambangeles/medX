import React from "react";
import { Container } from "reactstrap";

function terms() {
  return (
    <Container>
      <div>
        <h2
          className="dataDesign"
          style={{ textAlign: "center", marginBottom: "10px" }}
        >
          TERMS and CONDITIONS
        </h2>
        <br />
        <p>Effective Date: February 22, 2020 </p>
        <p
          style={{
            textIndent: "50px",
            textAlign: "justify"
          }}
        >
          Welcome to MedX! If you continue to browse and use this website, you
          agree to comply with and be bound by the following terms and
          conditions of use, which together with our privacy policy govern
          MedX’s relationship with you in relation to this website. If you
          disagree with any part of these terms and conditions, please do not
          use our website.
        </p>
        <p>The use of this website is subject to the following terms of use:</p>
        <ul>
          <li
            style={{
              textAlign: "justify"
            }}
          >
            The content of the pages of this website is for your general
            information and use only. It is subject to change without notice.
          </li>
          <li
            style={{
              textAlign: "justify"
            }}
          >
            Neither we nor any third parties provide any warranty or guarantee
            as to the accuracy, timeliness, performance, completeness or
            suitability of the information and materials found or offered on
            this website for any particular purpose. You acknowledge that such
            information and materials may contain inaccuracies or errors, and we
            expressly exclude liability for any such inaccuracies or errors to
            the fullest extent permitted by law.
          </li>
          <li
            style={{
              textAlign: "justify"
            }}
          >
            Your use of any information or materials on this website is entirely
            at your own risk, for which we shall not be liable. It shall be your
            personal responsibility to ensure that any products, services, or
            information available through this website meet your specific
            requirements.
          </li>

          <li
            style={{
              textAlign: "justify"
            }}
          >
            This website contains material which is owned by us. This material
            includes, but is not limited to, the design, layout, look,
            appearance, and graphics. Reproduction is prohibited other than in
            accordance with the copyright notice, which forms part of these
            terms and conditions.
          </li>
          <li
            style={{
              textAlign: "justify"
            }}
          >
            All trademarks reproduced in this website, which are not the
            property of, or licensed to the operator, are acknowledged on the
            website.
          </li>
          <li
            style={{
              textAlign: "justify"
            }}
          >
            Unauthorized use of this website may give rise to a claim for
            damages and/or be a criminal offense.
          </li>
        </ul>
      </div>
    </Container>
  );
}

export default terms;
