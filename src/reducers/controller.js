import {
  FETCH_CONTROLLER_BEGIN,
  FETCH_CONTROLLER_SUCCESS,
  FETCH_CONTROLLER_FAIL,
} from "../actions/types";

const initialState = {
  item: [],
  loading: false,
  error: null,
};

export default function controllerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTROLLER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CONTROLLER_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload,
      };
    case FETCH_CONTROLLER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        item: [],
      };
    default:
      return state;
  }
}
