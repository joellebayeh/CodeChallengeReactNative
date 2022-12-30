import React from 'react';
import {ActivityIndicator} from 'react-native';

const Spinner = props => {
  return <ActivityIndicator {...props} size="large"/>;
};

export default Spinner;
