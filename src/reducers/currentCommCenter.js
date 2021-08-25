import {
  FETCH_CURRENT_COMMCENTER_BEGIN,
  FETCH_CURRENT_COMMCENTER_SUCCESS,
  FETCH_CURRENT_COMMCENTER_FAIL,
  UPDATE_CURRENT_COMMCENTER,
} from "../actions/types";

const initialState = {
  item: {
    controllers: [],
    nasosi_journal_data: [],
    donesenii_journal_data: [],
    avarii_journal_data: [],
    fuel_journal_data: [],
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
      return {
        ...state,
        loading: false,
        item: action.payload,
      };
    case FETCH_CURRENT_COMMCENTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        item: {
          controllers: [],
          nasosi_journal_data: [],
          donesenii_journal_data: [],
          avarii_journal_data: [],
          fuel_journal_data: [],
        },
      };
    case UPDATE_CURRENT_COMMCENTER:
      return Object.assign({}, state, {
        item: action.payload,
      });

    default:
      return state;
  }
}
