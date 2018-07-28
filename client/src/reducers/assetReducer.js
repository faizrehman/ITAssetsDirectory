import {
    GET_ASSET,
    GET_ASSETS,
    ASSET_LOADING,
    DELETE_ASSET
  } from "../actions/type";
  
  const initialState = {
    asset: {},
    assets:[],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ASSET_LOADING:
      return {
        ...state,
        loading: true
      };
      case GET_ASSETS:
        return {
          ...state,
          assets: action.payload,
          loading: false
        };
  
      case GET_ASSET:
        return {
          ...state,
          asset: action.payload,
          loading: false
        };
        case DELETE_ASSET:
        return {
          ...state,
          assets: state.assets.filter(assets => assets._id !== action.payload),
          loading: false
        };  
      default:
        return state;
    }
  }
  