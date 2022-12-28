import React from 'react';
import {ActivityIndicator} from 'react-native';

const Spinner = props => {
  const color = props.color;
  return <ActivityIndicator size="large" color={color} />;
};

export default Spinner;
