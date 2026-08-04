import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const BouncySquare = () => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  // position  animation shared value
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // it should always be this lines

        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <Animated.View
        onTouchStart={() => {
          scale.value = withTiming(1.2);
        }}
        onTouchEnd={() => {
          scale.value = withTiming(1);
          rotate.value = withRepeat(withTiming(rotate.value + 90), 4, false);
        }}
        style={[styles.box, rContainerStyle]}
      />
      <TouchableOpacity
        onPress={() => {
          const MaxTranslationAmount = 100;
          const tX =
            Math.random() * (2 * MaxTranslationAmount) - MaxTranslationAmount;
          const tY =
            Math.random() * (2 * MaxTranslationAmount) - MaxTranslationAmount;

          translateX.value = withTiming(tX);
          translateY.value = withTiming(tY);
        }}
        style={styles.btn}
      />
    </View>
  );
};

export default BouncySquare;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#18a1dc",
    width: 120,
    height: 120,
    borderRadius: 30,
    borderCurve: "continuous",
  },
  btn: {
    width: 64,
    height: 64,
    backgroundColor: "black",
    borderRadius: 32,
    position: "absolute",
    bottom: 70,
    right: 48,
  },
});
