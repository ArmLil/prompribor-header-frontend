import { SET_ALERT } from "../actions/types";
import { CLOSE_ALERT } from "../actions/types";

const initialState = {
  status: "success",
  text: "Сделано!",
  show: false,
};

export default function AlertReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        status: payload.status,
        text: payload.text,
        show: true,
      };
    case CLOSE_ALERT:
      return {
        ...state,
        show: false,
      };

    default:
      return state;
  }
}
