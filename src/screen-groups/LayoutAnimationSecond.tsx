import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { generateRandomColor } from "../constants/utils";

const LayoutAnimationSecond = () => {
  const [ids, setIDs] = useState<string[]>([]);
  return (
    <View
      style={styles.container}
      onTouchEnd={() => {
        setIDs((prev) => [generateRandomColor(), ...prev]);
      }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: 70,
        }}
      >
        {ids.map((colorId, idx) => {
          return (
            <Animated.View
              key={colorId}
              layout={LinearTransition.springify()}
              entering={FadeIn.duration(250)}
              style={{
                height: 90,
                width: "95%",
                backgroundColor: colorId,
                borderRadius: 20,
                alignSelf: "center",
                marginBottom: 10,
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default LayoutAnimationSecond;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(220, 212, 212)",
  },
});
