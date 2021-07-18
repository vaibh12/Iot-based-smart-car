import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/Auth/ActionCreator";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Feather } from "@expo/vector-icons";
import ListItem from "../../Shared/Components/ListItem";
import { showSnack } from "../../Redux/Snack/ActionCreator";
//
import * as firebase from "firebase";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

const BACKGROUND_FIREBASE_TASK = "background_firebase_task";

// this is the background task to be registerd
TaskManager.defineTask(BACKGROUND_FIREBASE_TASK, async () => {
  try {
    // fetch data here...
    let error = false;
    try {
      await firebase
        .database()
        .ref("accident")
        .on("value", (snapshot) => {
          const rec = snapshot.val();
          console.log("Accident data", rec);
        });
      error = false;
    } catch (error) {
      error = true;
      console.log("Error in getting accident data", error);
    }
    try {
      await firebase
        .database()
        .ref("temp")
        .on("value", (snapshot) => {
          const rec = snapshot.val();
          console.log("Temperature data", rec);
        });
      error = false;
    } catch (error) {
      error = true;
      console.log("Error in getting temperature data", error);
    }
    return !error
      ? BackgroundFetch.Result.NewData
      : BackgroundFetch.Result.NoData;
  } catch (err) {
    return BackgroundFetch.Result.Failed;
  }
});

// this function registers the background task
async function registerBackgroundFetchAsync() {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FIREBASE_TASK, {
      minimumInterval: 5, // 1 minute
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
    console.log("Task registered");
  } catch (err) {
    console.log("Task Register failed:", err);
  }
}

// this function unregisters the background task
async function unregisterBackgroundFetchAsync() {
  try {
    BackgroundFetch.unregisterTaskAsync(BACKGROUND_FIREBASE_TASK);
    console.log("Task unregisterd");
  } catch (error) {
    console.log("Here is error in unregistering", error);
  }
}

export default function Home(props) {
  // Action sheet provider
  const { showActionSheetWithOptions } = useActionSheet();

  const theme = useSelector((state) => state.theme);
  const { colors } = theme;
  const emergencyContacts = useSelector((state) => state.emergencyContacts);

  const [backgroundTaskStatus, setBackgroundTaskStatus] = useState(null);
  const [isBackGroundTaskRegisterd, setIsBackGroundTaskRegisterd] =
    useState(false);

  const dispatch = useDispatch();

  const setHeaderOptions = () => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                paddingLeft: 15,
                paddingVertical: 12,
                paddingRight: 20,
              }}
              onPress={() => {
                openLogoutActionSheet();
              }}
            >
              <Feather name="log-out" size={22} color={theme.colors.textOne} />
            </TouchableOpacity>
          </View>
        );
      },
    });
  };

  const openLogoutActionSheet = () => {
    const options = ["Logout", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    const message = "Do you want to logout?";
    const messageTextStyle = {
      fontSize: 17,
      fontWeight: "700",
      color: theme.colors.textOne,
    };
    const containerStyle = { backgroundColor: theme.colors.backTwo };
    const textStyle = { color: theme.colors.textOne, fontWeight: "700" };

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        message,
        messageTextStyle,
        containerStyle,
        textStyle,
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          dispatch(logoutUser());
          return;
        }
      }
    );
  };

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FIREBASE_TASK
    );
    setBackgroundTaskStatus(status);
    setIsBackGroundTaskRegisterd(isRegistered);
  };

  const getLocPermission = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    console.log(status);
  };

  useEffect(() => {
    setHeaderOptions();
  }, [theme]);

  useEffect(() => {
    checkStatusAsync();
  }, []);

  const toggleFetchTask = async () => {
    if (isBackGroundTaskRegisterd) {
      await unregisterBackgroundFetchAsync();
    } else {
      if (emergencyContacts.data.length == 0) {
        dispatch(
          showSnack(
            "You have not added any contacts, add contacts to start the app."
          )
        );
        return;
      }
      await getLocPermission();
      await registerBackgroundFetchAsync();
    }
    checkStatusAsync();
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.backTwo }]}
    >
      <ScrollView>
        <ListItem
          title={"Manage Contacts"}
          rightIcon={"chevron-right"}
          leftIcon={"people-outline"}
          // style={{ marginTop: 3 }}
          onPress={() => props.navigation.navigate("AddEmergencyContacts")}
          rightIconColor={colors.textTwo}
        />
        <Text>{`Is running is background: ${
          isBackGroundTaskRegisterd ? "Yes" : "No"
        }`}</Text>
        <Text>
          {`Is background task savailable: ${BackgroundFetch?.Status[backgroundTaskStatus]}` ||
            null}
        </Text>
        {emergencyContacts.data.length == 0 ? (
          <Text style={[styles.noContactsTxt, { color: colors.textOne }]}>
            You have not added any emergency contacts, add contacts to start the
            app.
          </Text>
        ) : (
          <TouchableOpacity
            style={[styles.startBtn, { backgroundColor: colors.primaryColor }]}
            onPress={toggleFetchTask}
          >
            <Text style={[styles.startBtnTxt, { color: "#fff" }]}>
              {isBackGroundTaskRegisterd ? "Stop" : "Start"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  startBtn: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    marginHorizontal: 20,
  },
  startBtnTxt: {
    fontSize: 17,
    fontWeight: "700",
  },
  noContactsTxt: {
    fontSize: 16,
    fontWeight: "700",
    alignSelf: "center",
    margin: 10,
    textAlign: "center",
  },
});
