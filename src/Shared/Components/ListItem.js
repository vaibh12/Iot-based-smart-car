import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function ListItem(props) {
  const theme = useSelector((state) => state.theme);
  const { colors } = theme;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.mainView,
        props.style,
        { backgroundColor: colors.backOne },
      ]}
    >
      <View style={styles.leftView}>
        <Ionicons
          name={props.leftIcon}
          color={props?.leftIconColor || "#444"}
          size={25}
          style={styles.leftIcon}
        />
        <Text style={[styles.title, { color: props?.titleColor || "#000" }]}>
          {props.title}
        </Text>
      </View>
      <Feather
        name={props.rightIcon}
        color="#444"
        size={20}
        style={styles.rightIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 17,
    paddingHorizontal: 8,
  },
  rightIcon: {
    paddingHorizontal: 10,
  },
});
