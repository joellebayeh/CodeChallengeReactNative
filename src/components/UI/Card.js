import React from 'react';
import {View, StyleSheet} from 'react-native';


const Card = props => {
    const style = props.style
    return <View style={[styles.card,style]}>{props.children}</View>
};

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 5,
  },
});
