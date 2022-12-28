import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

const MyInput = props => {
  const {
    placeholder,
    name,
    color,
    Icon,
    value,
    onBlur,
    onChangeText,
    secureTextEntry,
    errors,
    touched,
  } = props;

  return (
    <React.Fragment>
      <View style={styles.inputContainerOne}>
        <Icon
          name={name}
          style={{marginVertical: 12}}
          size={25}
          color={color}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
        />
        {props.children}
      </View>
      {errors && touched ? <Text style={styles.errors}>{errors}</Text> : null}
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  inputContainerOne: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    margin: 10,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.blue,
    borderBottomWidth: 1,
    borderRightColor: Colors.blue,
    borderRightWidth: 2,
    borderBottomRightRadius: 80,
    fontSize: 18,
    width: '75%',
  },
  errors: {
      fontSize: 13,
      color: Colors.red,
      fontWeight: 'bold',
      marginBottom: 7,
      textAlign: 'center',
    },
})
export default MyInput;

