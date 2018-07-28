import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addAsset } from "../../actions/assetActions";
import SelectListGroup from "../common/SelectListGroup";
const Validator = require("validator");

class AddAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      description: "",
      type: "",
      status: "",
      initialpurchasedate: "",
      currentowner: "",
      current:false,
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const assetData = {
        label: this.state.label,
        description: this.state.description,
        type: this.state.type,
        status: this.state.status,
        initialpurchasedate: this.state.initialpurchasedate,
        currentowner: this.state.currentowner,
        current:this.state.current,
    };
    
    this.props.addAsset(assetData, this.props.history);
  }



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

 // Select options for status
 const optionsType = [
    { label: "* Select Asset Type", value: 0 },
    { label: "Laptop", value: "Laptop" },
    { label: "Desktop", value: "Desktop" },
    { label: "Mobile", value: "Mobile" },
    { label: "IPad", value: "IPad" }
  ];

   // Select options for status
   const optionsStatus = [
    { label: "* Select Status", value: 0 },
    { label: "In-use", value: "In-use" },
    { label: "Available", value: "Available" }
  ];



    return (
      <div className="add-asset">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Asset</h1>
              <p className="lead text-center">
                Add laptop, desktop, mobile etc. with current status
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* label"
                  name="label"
                  value={this.state.label}
                  onChange={this.onChange}
                  error={errors.label}
                />
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Write detail about the asset"
                />
 <SelectListGroup
                  placeholder="Type"
                  name="type"
                  value={this.state.type}
                  onChange={this.onChange}
                  options={optionsType}
                  error={errors.type}
                  info="Select asset type"
                />

                 <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={optionsStatus}
                  error={errors.status}
                  info="Select asset status"
                />
                <h6>Purchase Date</h6>
                <TextFieldGroup
                  name="initialpurchasedate"
                  type="date"
                  value={this.state.initialpurchasedate}
                  onChange={this.onChange}
                  error={errors.initialpurchasedate}
                />
                 <TextFieldGroup
                  placeholder="* Current Owner"
                  name="currentowner"
                  value={this.state.currentowner}
                  onChange={this.onChange}
                  error={errors.currentowner}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddAsset.propTypes = {
  addAsset: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addAsset })(
  withRouter(AddAsset)
);
