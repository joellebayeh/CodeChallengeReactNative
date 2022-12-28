import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';

import {getAllArticles} from '../store/actions/GetArticlesAction';
import {articleActions} from '../store/slices/article-slice';

import Colors from '../constants/colors';
import MySearchBar from '../components/navbar/MySearchBar';
import Card from '../components/UI/Card';
import Spinner from '../components/UI/Spinner';
import ArticleItem from '../components/article/ArticleItem';

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

  const [articlesToDisplay, showMessage] = searchInput
    ? [filterArticles, 'No articles contain these characters entered']
    : [articles, 'No articles to show'];


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
        <Card style={[styles.card, {shadowColor: Colors.blue2}]}>
          <Text
            style={{fontsize: 16, color: Colors.blue2, textAlign: 'center'}}>
            {showMessage}
          </Text>
        </Card>
      )}
      {error && !loading && (
        <Card style={[styles.card, {shadowColor: Colors.red}]}>
          <Text style={[styles.error, {fontsize: 16}]}>{error}</Text>
          <Text style={styles.error}>please pull down to refresh...</Text>
        </Card>
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
                setRefreshing(false);
              }
            : ()=>{
              setRefreshing(true);
              if(page !== 0){
                setPage(0);
                dispatch(articleActions.refresh());
              }
              setRefreshing(false);
            }
        }
        refreshing={refreshing}
      />
      {loading && <Spinner color={Colors.blue2} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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

export default ArticlesScreen;
