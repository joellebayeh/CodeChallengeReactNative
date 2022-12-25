import React from 'react';
import {useSelector} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

import LoginNavigator from './LoginNavigator';
import ArticlesNavigator from './ArticlesNavigator';

const AppContainerNavigator = () => {
  const {accessToken} = useSelector(state => state.login);
  return (
    <NavigationContainer>
      {accessToken ? <ArticlesNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

export default AppContainerNavigator;
