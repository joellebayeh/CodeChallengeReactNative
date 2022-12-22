import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ArticlesScreen from '../screens/ArticlesScreen';


const ArticlesStack = createNativeStackNavigator();

const ArticlesNavigator = () => {
  return (
    <ArticlesStack.Navigator>
      <ArticlesStack.Screen name="Articles" component={ArticlesScreen} />
    </ArticlesStack.Navigator>
  );
};

export default ArticlesNavigator;