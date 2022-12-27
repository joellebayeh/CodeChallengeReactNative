import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import Colors from '../constants/colors';
import {loginActions} from '../store/slices/login-slice';
import {getAllArticles} from '../store/actions/GetArticlesAction';
import MySearchBar from '../components/MySearchBar';
import ArticleItem from '../components/ArticleItem';

import {articleActions} from '../store/slices/article-slice';

const ArticlesScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const {
    articles,
    searchInput,
    loading,
    checkedEmpty,
    error,
    filterArticles,
    articleStatus,
  } = useSelector(state => state.article);

  const articlesToDisplay = searchInput ? filterArticles : articles;
  const showMessage = searchInput
    ? 'No articles contain these characters entered'
    : 'No articles to show';

  console.log('error:', error);
  console.log('filterArticles length:', filterArticles.length);
  console.log('articles length:', articles.length);

  useEffect(() => {
    dispatch(getAllArticles(page));
  }, [dispatch, page]);

  const renderItem = ({item}) => {
    return <ArticleItem article={item} />;
  };

  const search = value => {
    dispatch(articleActions.searchArticles(value));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.blanchedalmond}
        barStyle="dark-content"
      />
      <MySearchBar onChangeText={search} />
      {articlesToDisplay.length === 0 && articleStatus === 'success' && (
        <View style={styles.card}>
          <Text
            style={{fontsize: 16, color: Colors.blue2, textAlign: 'center'}}>
            {showMessage}
          </Text>
        </View>
      )}
      {error && !loading && (
        <View style={styles.card}>
          <Text style={[styles.error, {fontsize: 16}]}>{error}</Text>
          <Text style={styles.error}>please pulls down to refresh...</Text>
        </View>
      )}
      <FlatList
        keyExtractor={(item, index) => index}
        data={articlesToDisplay}
        renderItem={renderItem}
        onEndReached={
          checkedEmpty.length === 0 || searchInput
            ? null
            : () => {
                setPage(page + 1);
              }
        }
        onEndReachedThreshold={0}
        onRefresh={
          error
            ? () => {
                setRefreshing(true);
                dispatch(getAllArticles(page));
                console.log('refreshing with error');
                setRefreshing(false);
              }
            : null
        }
        refreshing={refreshing}
      />
      {loading && <ActivityIndicator size="large" color={Colors.blue} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 5,

    shadowColor: Colors.red,
    marginTop: Dimensions.get('window').height * 0.02,
    marginHorizontal: Dimensions.get('window').height * 0.08,
  },
  container: {
    flex: 1,
  },
  error: {
    textAlign: 'center',
    color: Colors.red,
    margin: 4,
  },
});

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
      <View
        style={{
          backgroundColor: Colors.blue2,
          borderBottomRightRadius: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 3,
          borderBottomLeftRadius: 3,
        }}>
        <TouchableNativeFeedback
          onPress={() => dispatch(loginActions.logOut())}>
          <Text style={{margin: 6, color: 'white', fontSize: 18}}>Logout</Text>
        </TouchableNativeFeedback>
      </View>
    );
  },
};

export default ArticlesScreen;
