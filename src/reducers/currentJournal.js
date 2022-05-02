import { SET_CURRENTJOURNAL } from "../actions/types";

const initialState = {
  item: "avarii",
};

export default function currentJournalReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENTJOURNAL:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
