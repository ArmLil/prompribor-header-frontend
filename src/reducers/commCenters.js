import {
  FETCH_COMMCENTERS_BEGIN,
  FETCH_COMMCENTERS_SUCCESS,
  FETCH_COMMCENTERS_FAIL,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function commCentersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMCENTERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_COMMCENTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.commCenters.rows,
      };
    case FETCH_COMMCENTERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    default:
      return state;
  }
}
