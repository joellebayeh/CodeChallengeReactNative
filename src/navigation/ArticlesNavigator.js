import React from 'react';
import {useDispatch} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {loginActions} from '../store/slices/login-slice';
import {articleActions} from '../store/slices/article-slice';

import Colors from '../constants/colors';
import MyButton from '../components/UI/MyButton';
import ArticlesScreen from '../screens/ArticlesScreen';

const ArticlesStack = createNativeStackNavigator();

export const ArticlesScreenOption = {
  headerTitle: 'Articles',
  headerTintColor: Colors.black,
  headerStyle: {
    backgroundColor: Colors.blanchedalmond,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.black,
  },
  headerRight: () => {
    const dispatch = useDispatch();
    return (
      <MyButton
        viewStyle={{
          backgroundColor: Colors.blue2,
          borderBottomRightRadius: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 3,
          borderBottomLeftRadius: 3,
        }}
        text="Logout"
        onPress={() => {
          dispatch(loginActions.logOut());
          dispatch(articleActions.refresh());
        }}
        textStyle={{margin: 8, color: 'white', fontSize: 18}}
      />
    );
  },
};

const ArticlesNavigator = () => {
  return (
    <ArticlesStack.Navigator>
      <ArticlesStack.Screen
        name="Articles"
        component={ArticlesScreen}
        options={ArticlesScreenOption}
      />
    </ArticlesStack.Navigator>
  );
};

export default ArticlesNavigator;
