import axios from "axios";
import {
  GET_ASSET,
  GET_ASSETS,
  GET_ERRORS,
  ASSET_LOADING,
  DELETE_ASSET
} from "./type";

//Get Asset By ID
export const getAssetByID = id => dispatch => {
  dispatch(setAssetLoading());
  //axios call
  axios
    .get(`/api/assets/${id}`)
    .then(res =>
      dispatch({
        type: GET_ASSET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSET,
        payload: {}
      })
    );
};

//Get All Assets
export const getAssets = () => dispatch => {
  dispatch(setAssetLoading());

  //axios call
  axios
    .get("/api/assets/all")
    .then(res =>
      dispatch({
        type: GET_ASSETS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ASSETS,
        payload: null
      })
    );
};

//Delete Asset
export const deleteAsset = id => dispatch => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    //axios call
    axios
      .delete(`/api/assets/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_ASSET,
          payload: id
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};


//Add Asset
export const addAsset = (assetData, history) => dispatch => {
  //axios call
  axios
    .post("/api/assets", assetData)
    .then(res => history.push("/Dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//Set asset loading
export const setAssetLoading = () => {
  return {
    type: ASSET_LOADING
  };
};
