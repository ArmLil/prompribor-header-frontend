import {
  FETCH_CONTROLLER_BEGIN,
  FETCH_CONTROLLER_SUCCESS,
  FETCH_CONTROLLER_FAIL,
  SOCKET_UPDATE_CONTROLLER,
} from "../actions/types";

const initialState = {
  item: {
    commCenter: { name: "", description: "", status: "", path: "" },
    name: "",
    description: "",
    modbusId: "",
    registersGroups: [],
  },
  loading: false,
  error: null,
};

const controller = JSON.parse(localStorage.getItem("item"));
console.log("controller", controller);

export default function controllerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTROLLER_BEGIN:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case FETCH_CONTROLLER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        item: action.payload,
      });

    case FETCH_CONTROLLER_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error,
        item: initialState.item,
      });

    case SOCKET_UPDATE_CONTROLLER:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        item: action.payload,
      });

    default:
      return state;
  }
}
