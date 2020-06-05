import React from "react";
import { Container, Table, Row } from "reactstrap";
import { connect } from "react-redux";
import { search, getPermissionsC, view } from "../../actions/blockchainActions";
import Request from "../searchProfile/request";
import "antd/dist/antd.css";
import { Input } from "antd";

class Search extends React.Component {
  state = {
    search: null
  };

  componentDidMount() {
    this.props.getPermissionsC();
  }

  render() {
    const { Search } = Input;
    const { search, msg } = this.props.medrec;
    if (msg === "REQUEST_SUCCESS" || msg === "CANCEL_REQUEST_SUCCESS") {
      window.location.assign("/");
    } else if (msg === "VIEW_SUCCESS") {
      window.location.assign("/viewpatient");
    }
    if (
      msg === "SEARCH_SUCCESS" ||
      msg === "REQUEST_SUCCESS" ||
      msg === "CANCEL_REQUEST_SUCCESS" ||
      msg === "VIEW_SUCCESS"
    ) {
      return (
        <div>
          <Container>
            <Table striped>
              <thead>
                <tr>
                  <th>
                    <h2 className="dataDesign">Results</h2>
                    <h5>{search.length} matches found</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {search.map((search) => (
                  <Request key={search._id} search={search} />
                ))}
              </tbody>
            </Table>
          </Container>
        </div>
      );
    }
    return (
      <Container>
        <Row className="searchimg" style={{ marginTop: "150px" }}>
          <div>
            <img
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "75%"
              }}
              src="medX.png"
              alt="Logo"
            />
          </div>
        </Row>
        <Row
          className="searchbar"
          style={{ paddingRight: "100px", paddingLeft: "100px" }}
        >
          <Search
            name="search"
            placeholder="Enter the name of the patient"
            onSearch={(value) =>
              !value ? this.props.search({}) : this.props.search(value)
            }
            size="large"
          />
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  medrec: state.medrec
});

export default connect(mapStateToProps, { search, view, getPermissionsC })(
  Search
);
