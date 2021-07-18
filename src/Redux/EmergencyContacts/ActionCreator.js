import { showSnack } from "../Snack/ActionCreator";
import * as ActionTypes from "./ActionTypes";

/**
 * Saves and array of contacts as emergency contacts
 * @param {Array} contacts
 * @returns
 */
export const saveEmerContacts = (contacts) => (dispatch) => {
  dispatch({ type: ActionTypes.SAVE_CONTACTS, payload: contacts });
  dispatch(showSnack("Contacts saved"));
};
