import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import {
  StoryCard,
  StoryListItemHeight,
  StoryListItemWidth,
  WindowWidth,
} from "../components/StoryCard";
import { BACKGROUND_COLOR, Stories } from "../constants/constant";

const StoryListUI = () => {
  const scrollOffset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.x;
    },
  });
  const ListPadding = WindowWidth - StoryListItemWidth;

  return (
    <View style={styles.container}>
      <View
        style={{
          height: StoryListItemHeight,
          width: "100%",
        }}
      >
        <Animated.ScrollView
          scrollEventThrottle={16}
          horizontal
          onScroll={scrollHandler}
          snapToInterval={StoryListItemWidth}
          decelerationRate={"fast"}
          disableIntervalMomentum
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            width: StoryListItemWidth * Stories.length + ListPadding,
          }}
        >
          {Stories.map((story, index) => {
            return (
              <StoryCard
                scrollOffset={scrollOffset}
                key={index}
                index={index}
                imageSource={story.image}
              />
            );
          })}
        </Animated.ScrollView>
      </View>
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
