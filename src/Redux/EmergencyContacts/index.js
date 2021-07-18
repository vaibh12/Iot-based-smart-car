import * as ActionTypes from "./ActionTypes";

export const EmergencyContacts = (
  state = {
    isLoading: false,
    errMess: null,
    data: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SAVE_CONTACTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        data: action.payload,
      };
    default:
      return state;
  }
};
