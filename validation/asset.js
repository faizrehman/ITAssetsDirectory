const Validator = require("validator");
const GlobalFunctions = require("./globalFunctions");

module.exports = function validateAssetInput(data) {
  let errors = {};

  data.label = !GlobalFunctions.isEmpty(data.label) ? data.label : "";
  data.description = !GlobalFunctions.isEmpty(data.description) ? data.description : "";
  data.type = !GlobalFunctions.isEmpty(data.type) ? data.type : "";
  data.status = !GlobalFunctions.isEmpty(data.status) ? data.status : "";
  data.initialpurchasedate = !GlobalFunctions.isEmpty(data.initialpurchasedate) ? data.initialpurchasedate : "";
  data.currentowner = !GlobalFunctions.isEmpty(data.currentowner) ? data.currentowner : "";

  if (Validator.isEmpty(data.label)) {
    errors.label = "Label is required";
  }
  if (Validator.isEmpty(data.type)) {
    errors.type = "Type is required";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  if (Validator.isEmpty(data.initialpurchasedate)) {
    errors.initialpurchasedate = "Purchase date is required";
  }

  if (Validator.isEmpty(data.currentowner)) {
    errors.currentowner = "Current owner is required";
  }

  return {
    errors,
    isValid: GlobalFunctions.isEmpty(errors)
  };
};
