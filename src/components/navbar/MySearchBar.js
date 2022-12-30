import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../constants/colors';

const MySearchBar = props => {
  const {onChangeText, value} = props;
  const [cliked, setCliked] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  console.log(cliked);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={25}
          color={Colors.blue2}
        />
        <TextInput
          style={styles.input}
          width={cliked ? '88%' : '94%'}
          value={inputValue}
          placeholder="search..."
          onChangeText={value => {
            console.log('onChange');
            onChangeText(value);
            setInputValue(value);
          }}
          onFocus={() => {
            setCliked(true);
          }}
          onBlur={() => {
            setCliked(false);
          }}
        />
        {cliked && (
          <Icon
            name="close"
            size={25}
            color={Colors.blue2}
            onPress={() => {
              setInputValue('');
              onChangeText('');
            }}
          />
        )}
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
    justifyContent:'center'
  },
  input: {
    fontSize: 18,
    marginHorizontal:3
  },
});

export default MySearchBar;
