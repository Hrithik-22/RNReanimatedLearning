import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BACKGROUND_COLOR } from "../constants/constant";

const StoryListUI = () => {
  return (
    <View style={styles.container}>
      <Text>StoryListUI</Text>
    </View>
  );
};

export default StoryListUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
});
