import React from "react";
import { StatusBar } from "react-native";
import Home from "../Pages/Home/index";
import Authentication from "../Pages/Authentication";

import CustomAlert from "../Shared/Components/CustomAlert";
import ThreeBtnAlert from "../Shared/Components/ThreeBtnAlert";

import { Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { hideSnack } from "../Redux/Snack/ActionCreator";

const Stack = createStackNavigator();

export default function Navigator() {
  const auth = useSelector((state) => state.auth);
  const snack = useSelector((state) => state.snack);
  const theme = useSelector((state) => state.theme);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={theme.mode ? "dark-content" : "light-content"}
        backgroundColor={theme.colors.backOne}
      />
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: { fontWeight: "700" },
          headerTintColor: theme.colors.textOne,
          headerStyle: { backgroundColor: theme.colors.backOne },
        }}
      >
        {auth.isAuthenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "Home",
                headerTitleStyle: { fontSize: 25, fontWeight: "700" },
              }}
            />
          </>
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Authentication"
            component={Authentication}
          />
        )}
      </Stack.Navigator>
      <Snackbar
        visible={snack.isVisible}
        onDismiss={() => dispatch(hideSnack())}
        action={
          snack.actionTxt
            ? {
                label: snack.actionTxt,
                onPress: () => {
                  snack.actionFunc();
                  dispatch(hideSnack());
                },
              }
            : null
        }
      >
        {snack.message}
      </Snackbar>
      <CustomAlert isVisible={alert.isVisible} />
      <ThreeBtnAlert isVisible={alert.is3BtnAlertVisible} />
    </NavigationContainer>
  );
}
