import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteAsset } from "../../actions/assetActions";

class Asset extends Component {
  onDeleteClick(id) {
    this.props.deleteAsset(id);
  }

  render() {
    const asset = this.props.asset.map(asset => (
      <tr key={asset._id}>
        <td> {asset.label}</td>
        <td> {asset.description}</td>
        <td> {asset.type}</td>
        <td> {asset.status}</td>
        <td>
          <Moment format="YYYY/MM/DD">{asset.initialpurchasedate}</Moment>
        </td>
        <td> {asset.currentowner}</td>
        <td>
          {" "}
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this, asset._id)}
          >
            {" "}
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4"> Assets </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Desc.</th>
              <th>Type</th>
              <th>Status</th>
              <th>Purchase Date</th>
              <th>Owner</th>
              <th />
            </tr>
          </thead>
          <tbody>{asset}</tbody>
        </table>
      </div>
    );
  }
}

Asset.protoTypes = {
  deleteAsset: PropTypes.func.isRequired
};

export default connect(null, { deleteAsset })(Asset);
