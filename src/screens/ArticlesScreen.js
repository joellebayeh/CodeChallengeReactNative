import React from 'react';
import {useDispatch} from 'react-redux';
import {Button, Text, TouchableOpacity} from 'react-native';

import Colors from '../constants/colors'
import {loginActions} from '../store/slices/login-slice';

const ArticlesScreen = () => {
  return <Text>ArticlesScreen</Text>;
};

export const ArticlesScreenOption = {
  headTitle: 'Articles',
  headerTintColor: Colors.black,
  headerStyle: {
    backgroundColor: Colors.beige2,
  },
  headerRight: () => {
    const dispatch = useDispatch();
    return (
        <TouchableOpacity
         style={{ backgroundColor: Colors.blue2 ,borderBottomRightRadius:30, borderTopLeftRadius:30, borderTopRightRadius:3,borderBottomLeftRadius:3}}
         onPress={() => dispatch(loginActions.logOut()) }
       >
         <Text style={{ margin:6, color: 'white', fontSize: 18}}> Logout </Text>
       </TouchableOpacity>   
    );
  },
};

export default ArticlesScreen;
