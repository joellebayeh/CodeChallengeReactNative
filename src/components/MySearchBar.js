import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/colors';

import Feather from 'react-native-vector-icons/Feather';

const MySearchBar = props => {
  const {onChangeText} = props
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={20}
          color={Colors.blue2}
          style={{marginRight: 2}}
        />
        <TextInput
          style={styles.input}
          placeholder="search..."
          onChangeText={value => onChangeText(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchBar: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginHorizontal: 3,
    backgroundColor: Colors.azure,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: Colors.blue,
    borderWidth: 1,
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    width: '95%',
  },
});

export default MySearchBar;
