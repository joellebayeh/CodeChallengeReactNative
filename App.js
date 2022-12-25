import React from 'react';
import {Provider} from 'react-redux';
import AppContainerNavigator from './src/navigation/AppContainerNavigator';

import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainerNavigator />
    </Provider>
  );
};

export default App;
