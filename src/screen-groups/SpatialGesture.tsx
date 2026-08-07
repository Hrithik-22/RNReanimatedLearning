import React from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const circleRadius = 30;

const SpatialGesture = () => {
  const top = useSharedValue(0);
  const left = useSharedValue(0);
  const scale = useSharedValue(0);

  const previousTop = useSharedValue(0);
  const previousLeft = useSharedValue(0);

  const onPressTap = Gesture.Tap().onBegin((e) => {
    previousTop.value = top.value;
    previousLeft.value = left.value;
    top.value = e.y - circleRadius;
    left.value = e.x - circleRadius;
  });

  useAnimatedReaction(
    () => {
      return left.value;
    },
    (curr, prev) => {
      if (curr !== prev && curr !== 0) {
        cancelAnimation(scale);
        scale.value = 0;
        scale.value = withSpring(1);
      }
    },
  );

  const tapAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],

      left: withTiming(left.value),
      top: withTiming(top.value),
    };
  }, []);

  const PreviousTapAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(previousLeft.value),
      top: withTiming(previousTop.value),
    };
  });
  const animatedLeft = useDerivedValue(() => {
    return withTiming(left.value, {
      duration: 1000,
      easing: Easing.out(Easing.quad),
    });
  });
  const animatedTop = useDerivedValue(() => {
    return withTiming(top.value, {
      duration: 1000,
      easing: Easing.out(Easing.quad),
    });
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: animatedLeft.value,
      top: animatedTop.value,
    };
  });
  return (
    <GestureDetector gesture={onPressTap}>
      <Animated.View style={styles.container}>
        <Animated.View style={[styles.circle, tapAnimatedStyle]} />
        <Animated.View style={[styles.circle, PreviousTapAnimatedStyle]} />
        <Animated.View
          style={[
            styles.circle,
            {
              backgroundColor: "#18a1dc",
            },
            animatedStyle,
          ]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default SpatialGesture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  circle: {
    position: "absolute",
    backgroundColor: "#2f2f2f",
    width: circleRadius * 2,
    height: circleRadius * 2,
    borderRadius: circleRadius,
  },
});
