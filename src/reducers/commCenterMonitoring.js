import {
  FETCH_COMMCENTER_MONITORING_BEGIN,
  FETCH_COMMCENTER_MONITORING_SUCCESS,
  FETCH_COMMCENTER_MONITORING_FAIL,
  SOCKET_UPDATE_COMMCENTER_MONITORING,
} from "../actions/types";

const initialState = {
  item: {
    name: "",
    description: "",
    status: "",
    path: "",
    controllers: [],
  },
  loading: false,
  error: null,
};

export default function commCenterMonitoringReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case FETCH_COMMCENTER_MONITORING_BEGIN:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case FETCH_COMMCENTER_MONITORING_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        item: action.payload,
      });

    case FETCH_COMMCENTER_MONITORING_FAIL:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload,
        item: initialState.item,
      });

    case SOCKET_UPDATE_COMMCENTER_MONITORING:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        item: action.payload,
      });

    default:
      return state;
  }
}
