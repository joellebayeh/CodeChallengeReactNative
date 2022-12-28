import React from 'react';
import {TouchableNativeFeedback, View, Text} from 'react-native';

const MyButton = props => {
  const {viewStyle, text, disabled, onPress, textStyle} = props;
  return (
    <View style={viewStyle}>
      <TouchableNativeFeedback disabled={disabled} onPress={onPress}>
        <Text style={textStyle}>{text}</Text>
      </TouchableNativeFeedback>
    </View>
  );
};

export default MyButton;
