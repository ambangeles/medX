import React from "react";
import { Container } from "reactstrap";

class Fmedicalrecords extends React.Component {
  render() {
    return (
      <div className="paging">
        <Container className="bordercolor3">{this.props.records} </Container>
      </div>
    );
  }
}
export default Fmedicalrecords;
