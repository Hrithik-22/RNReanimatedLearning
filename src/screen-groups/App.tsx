import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

export const App = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);
  /*a special kind of box that both your JavaScript code
    and the animation engine can peek into and update instantly,
    without waiting on each other. */

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * 150) / 2,
      transform: [
        { scale: scale.value },
        { rotate: ` ${Math.PI * 2 * progress.value}rad` },
      ],
    };
  });

  /*useAnimatedStyle is how you turn a number sitting in a shared value's box 
  into an actual visual style — position, size, opacity, rotation, 
  whatever — that gets applied to something on screen.*/

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
  },
});
