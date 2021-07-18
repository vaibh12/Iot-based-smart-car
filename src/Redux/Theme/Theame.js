import * as ActionTypes from "./ActionTypes";

const lightMode = {
  primaryColor: "#3071ff",
  primaryLightColor: "#5c8bf2",
  primaryErrColor: "#f25246",
  primarySuperFadedColor: "#95b5fc",
  secondaryColor: "",
  thirdColor: "",
  backOne: "#fff",
  backTwo: "#f2f2f2",
  backThree: "#efefef",
  backFour: "#000",
  transparentBackOne: "#fffd",
  textOne: "#000",
  textTwo: "#444",
  textThree: "#777",
  textFour: "#fff",
  borderColor: "#efefef",
};

const darkMode = {
  primaryColor: "#3071ff",
  primaryLightColor: "#5c8bf2",
  primaryErrColor: "#f25246",
  primarySuperFadedColor: "#95b5fc",
  secondaryColor: "",
  thirdColor: "",
  backOne: "#000",
  backTwo: "#333",
  backThree: "#555",
  backFour: "#fff",
  transparentBackOne: "#0005",
  textOne: "#fff",
  textTwo: "#aaa",
  textThree: "#888",
  textFour: "#000",
  borderColor: "#555",
};

export const Theme = (state = { colors: lightMode, mode: true }, action) => {
  switch (action.type) {
    case ActionTypes.SWITCH_TO_DARK:
      return {
        ...state,
        colors: darkMode,
        mode: false,
      };

    case ActionTypes.SWITCH_TO_LIGHT:
      return {
        ...state,
        colors: lightMode,
        mode: true,
      };

    case ActionTypes.TOGGEL_THEME:
      return {
        ...state,
        colors: state.mode ? darkMode : lightMode,
        mode: !state.mode,
      };

    // case ActionTypes.LOGOUT_SUCCESS:
    //   return { colors: lightMode, mode: true };

    default:
      return state;
  }
};
