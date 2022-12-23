import {NavigationContainer} from '@react-navigation/native';

import LoginNavigator from './LoginNavigator';
import ArticlesNavigator from './ArticlesNavigator';

const AppContainerNavigator = () => {
  const token = false;
  return (
    <NavigationContainer>
      {token ? <ArticlesNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
};

export default AppContainerNavigator;
