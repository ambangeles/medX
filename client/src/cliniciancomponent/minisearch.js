import React, { Component } from "react";
import { Nav } from "reactstrap";
import { search } from "../actions/blockchainActions";
import "antd/dist/antd.css";
import { Input } from "antd";
import { connect } from "react-redux";

export class MiniSearch extends Component {
  render() {
    const { Search } = Input;

    return (
      <Nav navbar>
        <div className="searchbarsize">
          <Search
            name="search"
            placeholder="Enter the name of the patient"
            onSearch={(value) =>
              !value ? this.props.search({}) : this.props.search(value)
            }
            size="large"
          />
        </div>
      </Nav>
    );
  }
}
const mapStateToProps = (state) => ({
  medrec: state.medrec
});

export default connect(mapStateToProps, { search })(MiniSearch);
