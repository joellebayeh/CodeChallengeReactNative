import React from 'react';
import {View, StyleSheet,TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Colors from '../../constants/colors';

const MySearchBar = props => {
  const {onChangeText} = props;
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather
          name="search"
          style={{marginVertical: 12}}
          size={25}
          color={Colors.blue2}
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
