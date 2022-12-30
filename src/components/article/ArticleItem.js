import React from 'react';
import {Text, View, StyleSheet, Dimensions, Linking} from 'react-native';

import Card from '../UI/Card';
import Colors from '../../constants/colors';

height = Dimensions.get('window').height;

const ArticleItem = props => {
  const {headline, abstract, pub_date, web_url, source} = props.article;
  return (
    <Card style={{margin: height * 0.01,shadowColor: Colors.black}}>
      <Text style={styles.title}>{headline.main}</Text>
      <Text style={styles.abstract}>
        {abstract.substring(0, 200)}
        {abstract.length > 300 && <Text style={styles.points}> . . .</Text>}
      </Text>
      <View style={styles.end}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.source}>{source}</Text>
          <Text style={styles.date}>{pub_date}</Text>
        </View>
        <Text style={styles.link} onPress={() => Linking.openURL(`${web_url}`)}>
          see more ...
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.blue2,
    marginVertical: 3,
    justifyContent: 'flex-start',
  },
  abstract: {
    textAlign: 'center',
    color: Colors.black,
    margin: 3,
  },
  points: {
    fontWeight: 'bold',
    color: Colors.blue2,
    fontSize: 18,
  },
  end: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  date: {
    fontSize: 9,
  },
  link: {
    color: Colors.blue,
    margin:5
  },
  source: {
    color: Colors.brown,
    fontSize: 13,
  },
});

export default ArticleItem;
