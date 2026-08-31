import React from "react";
import { StyleSheet, View } from "react-native";
import AnimatedTextComponent from "../components/AnimatedTextComponent";

const AnimatedTextTut = () => {
  return (
    <View style={styles.container}>
      <AnimatedTextComponent
        textStyle={styles.textStyle}
        containerStyle={styles.containerStyle}
        content="For the things we have to learn before we can do them, we learn by doing them. REACT NATIVE ❤️"
      />
    </View>
  );
};

export default AnimatedTextTut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  containerStyle: {},
  textStyle: {
    fontSize: 28,
    fontStyle: "normal",
    fontWeight: "bold",
    fontFamily: "Menlo",
    marginBottom: 14,
  },
});
