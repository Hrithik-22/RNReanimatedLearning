import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { Keyframe } from "react-native-reanimated";

const LayoutAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const InitialKeyFrame = {
    opacity: 0,
    transform: [
      {
        perspective: 400,
      },
    ],
  };
  const EndKeyFrame = {
    opacity: 1,
    transform: [
      {
        perspective: 400,
      },
    ],
  };
  const CustomFlipIn = new Keyframe({
    from: InitialKeyFrame,
    to: EndKeyFrame,
  }).duration(200);
  const CustomFlipOut = new Keyframe({
    from: EndKeyFrame,
    to: InitialKeyFrame,
  });
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        console.log("presssed");
        setIsVisible((prev) => !prev);
      }}
    >
      {isVisible && (
        <Animated.View
          entering={CustomFlipIn}
          exiting={CustomFlipOut}
          style={{
            height: 120,
            aspectRatio: 1,
            borderRadius: 20,
            borderCurve: "continuous",
            backgroundColor: "#0086e6",
          }}
        />
      )}
    </Pressable>
  );
};

export default LayoutAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(220, 212, 212)",
  },
});
