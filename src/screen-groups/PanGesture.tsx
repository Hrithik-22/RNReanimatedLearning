import React from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const PanGesture = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });
  const isDragging = useSharedValue(false);
  const scale = useDerivedValue(() => {
    return withSpring(isDragging.value ? 0.9 : 1);
  });
  const rotate = useDerivedValue(() => {
    return withSpring(isDragging.value ? "45deg" : "0deg");
  });
  const panGesture = Gesture.Pan()
    .onBegin((e) => {
      context.value = { x: e.translationX, y: e.translationY };
      isDragging.value = true;
    })
    .onUpdate((e) => {
      translateX.value = context.value.x + e.translationX;
      translateY.value = context.value.y + e.translationY;
    })
    .onFinalize(() => {
      isDragging.value = false;
    });
  const color = useDerivedValue(() => {
    if (isDragging.value) return "#18a1dc";
    if (translateY.value > 0) return "#fff";
    else if (translateY.value < 0) return "#000";
    return "#18a1dc";
  });
  const animateColor = useDerivedValue(() => {
    return withTiming(color.value);
  });
  const rAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: animateColor.value,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: rotate.value },
      ],
    };
  });
  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.box, rAnimatedStyle]} />
      </GestureDetector>

      <View style={styles.bgBlack} />
    </View>
  );
};

export default PanGesture;

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
  bgBlack: {
    backgroundColor: "#000",
    position: "absolute",
    top: "50%",
    left: 0,
    height: "50%",
    width: "100%",
    zIndex: -1,
  },
});
