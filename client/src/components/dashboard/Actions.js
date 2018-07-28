import React from "react";
import { Link } from "react-router-dom";

const Actions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/add-asset" className="btn btn-light">
        <i className="fas fa-laptop text-info mr-1" />
        Add New Asset
      </Link>
    </div>
  );
};

export default Actions;
