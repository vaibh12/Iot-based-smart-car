[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/rishi-singh26/Expo_firebase_boilerplate)

# Expo app with firebse authentication and stack navigation setup

## Installation

```sh
$ https://github.com/rishi-singh26/Expo_firebase_boilerplate.git
Clones this repo
$ npm install
Install all the node modules
$ expo upgrade
```

### Firebase credentials setup

- Create a new folder named "Constants" inside "src".
- Inside "Constants" foldar create a file by name "Api.js"
- Inside "Api.js" copy the code below

```sh
import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL: "DATABASE_URL",
  projectId: "PRIJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const cloudStorage = firebase.storage();
```

### Dependencies

| Dependencies                          | README                                                                |
| ------------------------------------- | --------------------------------------------------------------------- |
| firebase                              | [https://www.npmjs.com/package/firebase]                              |
| redux                                 | [https://www.npmjs.com/package/redux]                                 |
| react-redux                           | [https://www.npmjs.com/package/react-redux]                           |
| redux-logger                          | [https://www.npmjs.com/package/redux-logger]                          |
| redux-persist                         | [https://www.npmjs.com/package/redux-persist]                         |
| redux-thunk                           | [https://www.npmjs.com/package/redux-thunk]                           |
| @expo/vector-icons                    | [https://www.npmjs.com/package/@expo/vector-icons]                    |
| @react-native-async-storage/async-storage | [https://www.npmjs.com/package/@react-native-async-storage/async-storage] |
| react-native-paper                    | [https://www.npmjs.com/package/react-native-paper]                    |
