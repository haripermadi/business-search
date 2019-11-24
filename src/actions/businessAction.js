import axios from "axios";
import { FETCH_LIST, FETCH_DETAIL } from "./types";

const API_KEY =
  "Bearer I14teEMWWpHIXE1Nd2I5FsTZ8mxh7N-ph6VI7OYvaL5G0ZqQ7MSusiLi0R1IRE0m35YhUDJ_CnLQPINO0aQSR3RupI-6FlF1BjuIAtsxzUxx5ahqs3oHpCTPNMPXXXYx";

export const fetchBusinessList = search => async dispatch => {
  let url = "https://api.yelp.com/v3/businesses/search";
  try {
    let response = await axios({
      method: "get",
      url,
      headers: {
        Authorization: API_KEY
      },
      params: {
        location: "new york",
        term: search
      }
    });
    console.log("res--action fetch---", response);
    dispatch({
      type: FETCH_LIST,
      payload: response.data.businesses
    });
  } catch (err) {
    console.log("err catch---", err);
    alert(err.message);
  }
};

export const fetchBusinessDetail = id => async dispatch => {
  console.log("FETCH DETAIL ACTION----", id);
  let url = `https://api.yelp.com/v3/businesses/${id}`;
  try {
    let response = await axios({
      method: "get",
      url,
      headers: {
        Authorization: API_KEY
      }
    });
    console.log("res--action detail---", response);
    dispatch({
      type: FETCH_DETAIL,
      detail: response.data,
      entries: response.data.photos
    });
  } catch (err) {
    console.log("err catch---", err);
    alert(err.message);
  }
};
