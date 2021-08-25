import {
  FETCH_MAP_COMMCENTERS_BEGIN,
  FETCH_MAP_COMMCENTERS_SUCCESS,
  FETCH_MAP_COMMCENTERS_FAIL,
  UPDATE_MAP_COMMCENTERS,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
  mapPolylinePoints: [],
  bridge: [],
  error: null,
};

export default function mapCommCentersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MAP_COMMCENTERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MAP_COMMCENTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.commCenters.rows,
        mapPolylinePoints: action.payload.commCenters.mapPolylinePoints.rows,
        bridge: action.payload.bridge,
      };
    case FETCH_MAP_COMMCENTERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
        mapPolylinePoints: [],
        bridge: [],
      };
    case UPDATE_MAP_COMMCENTERS:
      console.log(action, action.payload);
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
