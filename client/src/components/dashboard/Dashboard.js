import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Actions from "./Actions";
import {
  getAssets
} from "../../actions/assetActions";
import Asset from "./Asset";
import Spinner from "../common/spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAssets();
  }

  render() {
    const { user } = this.props.auth;
    const { assets , loading } = this.props.asset;

   
    let dashboardContent;

    if (assets === null || loading) {
      dashboardContent = <Spinner/>;
    } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.email}</p>
            <Actions />
            <Asset asset={assets} />
           </div>
        );
    
  }
  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    </div>
  );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getAssets: PropTypes.func.isRequired,
  asset: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  asset: state.asset
});
export default connect(mapStateToProps, { getAssets })(
  Dashboard
);
