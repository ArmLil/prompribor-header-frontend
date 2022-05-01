import {
  FETCH_CURRENT_COMMCENTER_BEGIN,
  FETCH_CURRENT_COMMCENTER_SUCCESS,
  FETCH_CURRENT_COMMCENTER_FAIL,
  UPDATE_CURRENT_COMMCENTER,
} from "../actions/types";

const initialState = {
  item: {
    path: "",
    nasosi: { rows: [], count: 0, limit: 5, offset: 0 },
    avarii: { rows: [], count: 0, limit: 5, offset: 0 },
    donesenii: { rows: [], count: 0, limit: 5, offset: 0 },
    fuel: { rows: [], count: 0, limit: 5, offset: 0 },
  },
  loading: false,
  error: null,
};

export default function currentCommCenterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENT_COMMCENTER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CURRENT_COMMCENTER_SUCCESS:
      return Object.assign({}, state, {
        item: action.payload,
        loading: false,
      });

    case FETCH_CURRENT_COMMCENTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        item: {
          path: "",
          nasosi: { rows: [], count: 0, limit: 5, offset: 0 },
          avarii: { rows: [], count: 0, limit: 5, offset: 0 },
          donesenii: { rows: [], count: 0, limit: 5, offset: 0 },
          fuel: { rows: [], count: 0, limit: 5, offset: 0 },
        },
      };
    case UPDATE_CURRENT_COMMCENTER:
      let updated_commCenter = Object.assign({}, state, {
        item: action.payload,
      });
      return updated_commCenter;

    default:
      return state;
  }
}
