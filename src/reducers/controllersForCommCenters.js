import {
  FETCH_CONTROLLERS_FOR_COMMCENTER_BEGIN,
  FETCH_CONTROLLERS_FOR_COMMCENTER_SUCCESS,
  FETCH_CONTROLLERS_FOR_COMMCENTER_FAIL,
  SOCKET_UPDATE_CONTROLLER,
} from "../actions/types";

const initialState = {
  controllers: [],
  loading: false,
  error: null,
};

const controller = JSON.parse(localStorage.getItem("item"));

export default function controllersForCommCentersReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case FETCH_CONTROLLERS_FOR_COMMCENTER_BEGIN:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case FETCH_CONTROLLERS_FOR_COMMCENTER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        controllers: action.payload,
      });

    case FETCH_CONTROLLERS_FOR_COMMCENTER_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload,
        controllers: initialState.item,
      });

    case SOCKET_UPDATE_CONTROLLER:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        controllers: action.payload,
      });

    default:
      return state;
  }
}
