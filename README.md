# Smart car to send accident alert to selected contacts

## Installation

```sh
$ https://github.com/vaibh12/Iot-based-smart-car.git
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
