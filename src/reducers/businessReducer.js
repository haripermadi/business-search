import { combineReducers } from "redux";
import { FETCH_LIST, FETCH_DETAIL } from "../actions/types";

const INITIAL_STATE = {
  listData: [],
  detail: {},
  entries: []
};

const businessReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LIST:
      return { ...state, listData: [...action.payload] };
    case FETCH_DETAIL:
      console.log("reducer detail----", action);
      return {
        ...state,
        detail: action.detail,
        entries: action.entries
      };
    default:
      return state;
  }
};

export default combineReducers({
  business: businessReducer
});
