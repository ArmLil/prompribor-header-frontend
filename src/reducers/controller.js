import {
  FETCH_DATA_BEGIN,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAIL,
} from "../actions/types";

const initialState = {
  item: {},
  loading: false,
  error: null,
};

export default function controllerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.commCenters.rows,
      };
    case FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        item: {},
      };
    default:
      return state;
  }
}
