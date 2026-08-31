import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  TextStyle,
  ViewStyle,
} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

type AnimatedTextComponentProps = {
  content: string;
  textStyle: TextStyle;
  containerStyle: ViewStyle;
};

const AnimatedTextComponent: React.FC<AnimatedTextComponentProps> = ({
  content,
  textStyle,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{content}</Text>
    </View>
  );
};

export default AnimatedTextComponent;

const styles = StyleSheet.create({});
