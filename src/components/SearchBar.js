import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../constants/colors';

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setCLicked}) => {
  return (
    <View style={styles.container}>
      <View
        // style={
        //   clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        // }
        style={[styles.searchBar, clicked ? styles.searchBar_click : null]}>
        {/* search Icon */}
        {/* <View style={styles.iconContainer}>
          <Feather name="search" size={25} color={colors.blue2} />
        </View> */}
        <Feather
          name="search"
          size={15}
          color={colors.blue2}
          style={{marginHorizontal: 3, width: '10%'}}
        />
        {/* Input field */}
        <TextInput
          style={[styles.input, clicked ? {width: '80%'} : {width: '90%'}]}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}

        {/* {clicked && (
          <View style={styles.iconContainer}>
            <Entypo name="cross" size={25} color={colors.black} />
          </View>
        )} */}
      </View>
      {clicked && (
        <Entypo
          name="cross"
          size={15}
          color="black"
          style={{marginHorizontal: 3, width: '10%'}}
          onPress={() => {
            setSearchPhrase('');
          }}
        />
      )}
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBar: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginHorizontal: 3,
    backgroundColor: colors.azure,
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar_click: {
    justifyContent: 'space-evenly',
    backgroundColor: colors.blanchedalmond,
  },
  iconContainer: {
    width: '10%',
  },
  //   searchBar__unclicked: {
  //     padding: 10,
  //     flexDirection: 'row',
  //     // width: '95%',
  //     margin: 3,
  //     backgroundColor: colors.blue,
  //     borderRadius: 15,
  //     alignItems: 'center',
  //   },
  //   searchBar__clicked: {
  //     padding: 10,
  //     flexDirection: 'row',
  //     // width: '80%',
  //     backgroundColor: colors.beige2,
  //     borderRadius: 15,
  //     alignItems: 'center',
  //     justifyContent: 'space-evenly',
  //   },
  input: {
    fontSize: 20,
    marginLeft: 10,
    // width: '80%',
  },
});

export default SearchBar;
