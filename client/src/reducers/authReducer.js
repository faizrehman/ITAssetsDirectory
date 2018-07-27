import { SET_CURRENT_USER } from "../actions/type";
const GlobalFunctions = require("../validation/globalFunctions");

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !GlobalFunctions.isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
