import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "../../Redux/Alert/ActionCreator";
import { saveEmerContacts } from "../../Redux/EmergencyContacts/ActionCreator";
import { showSnack } from "../../Redux/Snack/ActionCreator";

export default function AddEmergencyContacts() {
  const theme = useSelector((state) => state.theme);
  const { colors } = theme;
  const emergencyContactsStore = useSelector(
    (state) => state.emergencyContacts
  );

  const [emergencyContacts, setEmergencyContacts] = useState(
    emergencyContactsStore.data
  );

  const dispatch = useDispatch();

  const setData = (dataName, index, data) => {
    const thisEmergencyData = emergencyContacts[index];
    const allEmergencyData = [...emergencyContacts];
    thisEmergencyData[dataName] = data;
    allEmergencyData.splice(index, 1, thisEmergencyData);
    setEmergencyContacts(allEmergencyData);
  };

  const addData = () => {
    const newData = { name: "", contactNumber: "" };
    setEmergencyContacts([...emergencyContacts, newData]);
  };

  const removeData = () => {
    try {
      if (emergencyContacts.length > 2) {
        const allEmergencyData = [...emergencyContacts];
        allEmergencyData.pop();
        setEmergencyContacts(allEmergencyData);
      } else {
        dispatch(showSnack("Minimum two contacts are required"));
      }
    } catch (err) {
      dispatch(showSnack("An error occured, please try again"));
      console.log("Error while removing data field on CREATE LOG");
    }
  };

  const hasFilledData = () => {
    let hasFilled = true;
    for (let i = 0; i < emergencyContacts.length; i++) {
      if (
        emergencyContacts[i].name == "" ||
        emergencyContacts[i].contactNumber == ""
      ) {
        hasFilled = false;
        break;
      }
    }
    return hasFilled;
  };

  const saveContacts = () => {
    if (!hasFilledData()) {
      dispatch(showSnack("Enter the contact details properly!!"));
      return;
    }
    if (emergencyContacts.length < 2) {
      dispatch(showSnack("Minimum two contacts are required!!"));
      return;
    }
    dispatch(
      showAlert(
        "These contacts will be saved to your emergancy contacts list.",
        "",
        () => dispatch(saveEmerContacts(emergencyContacts))
      )
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backOne }}>
      <Text style={[styles.addContactsTxt, { color: colors.textOne }]}>
        Manage your emergency contacts.
      </Text>
      <FlatList
        data={emergencyContacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.textInputView}>
              <Text>{`Contact ${index + 1}`}</Text>
              <TextInput
                style={[
                  styles.textInput,
                  { backgroundColor: colors.backTwo, color: colors.textOne },
                ]}
                value={item.name}
                placeholder={"Contact Name"}
                keyboardType={"default"}
                placeholderTextColor={colors.textTwo}
                onChangeText={(txt) => setData("name", index, txt)}
              />
              <TextInput
                style={[
                  styles.textInput,
                  { backgroundColor: colors.backTwo, color: colors.textOne },
                ]}
                value={item.contactNumber}
                placeholder={"Contact Number"}
                keyboardType={"number-pad"}
                placeholderTextColor={colors.textTwo}
                onChangeText={(txt) => setData("contactNumber", index, txt)}
              />
            </View>
          );
        }}
        ListFooterComponent={
          <View style={styles.dataAddrBtnsContainer}>
            {emergencyContacts.length > 0 && (
              <TouchableOpacity
                style={[
                  styles.dataAddrRemoverBtn,
                  {
                    backgroundColor: colors.backOne,
                    borderColor:
                      emergencyContacts.length > 2
                        ? colors.primaryColor
                        : colors.backThree,
                  },
                ]}
                onPress={removeData}
              >
                <Text
                  style={{
                    fontSize: 17,
                    color:
                      emergencyContacts.length > 2
                        ? colors.primaryColor
                        : colors.backThree,
                  }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.dataAddrRemoverBtn,
                {
                  backgroundColor: colors.backOne,
                  borderColor: colors.primaryColor,
                },
              ]}
              onPress={addData}
            >
              <Text style={{ fontSize: 17, color: colors.primaryColor }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
      <TouchableOpacity
        style={[
          styles.createLogBtn,
          {
            backgroundColor: colors.primaryColor,
          },
        ]}
        onPress={saveContacts}
      >
        <Text style={styles.createLogBtnTxt}>{"Save"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addContactsTxt: {
    fontWeight: "700",
    fontSize: 16,
    marginVertical: 7,
    marginHorizontal: 10,
  },
  textInputView: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 7,
    marginVertical: 4,
  },
  dataAddrBtnsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  dataAddrRemoverBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 7,
    minWidth: 160,
    borderWidth: 1,
  },
  createLogBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 7,
    minWidth: 160,
    marginBottom: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  createLogBtnTxt: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
});
