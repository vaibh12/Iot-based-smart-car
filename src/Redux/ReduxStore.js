import { createStore, combineReducers, applyMiddleware } from "redux";
import { Auth } from "./Auth/Auth";
import { Snack } from "./Snack/Snack";
import { Theme } from "./Theme/Theame";
import { Alert } from "./Alert/Alert";

import thunk from "redux-thunk";
import logger from "redux-logger";

import { persistStore, persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ConfigureStore = () => {
  const config = {
    key: "root",
    storage: AsyncStorage,
    debug: true,
    blacklist: ["snack"],
  };
  const store = createStore(
    persistCombineReducers(config, {
      auth: Auth,
      snack: Snack,
      theme: Theme,
      alert: Alert,
    }),
    applyMiddleware(thunk)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
