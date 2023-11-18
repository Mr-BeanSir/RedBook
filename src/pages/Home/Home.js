import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {observer, useLocalObservable} from 'mobx-react';
import HomeStore from '../../store/HomeStore';
import {useEffect} from 'react';
import FlowList from '../../components/flowlist/FlowList';
import ResizeImage from '../../components/ResizeImage';
import Hearts from '../../components/Hearts';
import Header from './components/Header';
import CategoryHeader from './components/CategoryHeader';

const {width} = Dimensions.get('window');
const Home = observer(() => {
  const store = useLocalObservable(() => new HomeStore());

  useEffect(() => {
    store.requestHomeList();
    store.getCategoryList();
  }, []);

  const renderItem = ({item, index}) => {
    const onChanged = bool => {
      console.log('click');
      item.isFavorite = bool;
    };
    return (
      <TouchableOpacity key={item} style={styles.item} activeOpacity={0.5}>
        <ResizeImage style={styles.img} uri={item.image} />
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.itemNameView}>
          <Image
            style={styles.itemNameViewImg}
            source={{uri: item.avatarUrl}}
          />
          <Text style={styles.itemNameViewText}>{item.userName}</Text>
          <Hearts size={23} onChanged={onChanged} bool={item.isFavorite} />
          {/*<Image*/}
          {/*  style={styles.itemNameViewHeart}*/}
          {/*  source={require('../assets/icon_heart_empty.png')}*/}
          {/*/>*/}
          <Text style={styles.itemNameViewHeartText}>{item.favoriteCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  // console.log(store.categoryList);
  const categoryList = store.categoryList.filter(i => i.isAdd);
  return (
    <View style={styles.root}>
      <Header />
      <CategoryHeader categoryData={categoryList} all={store.categoryList} />
      <FlowList
        data={store.homeList}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{paddingTop: 6}}
        refreshing={store.refreshing}
        onRefresh={store.Refresh}
        onEndReachedThreshold={0.1}
        onEndReached={store.requestHomeList}
        ListFooterComponent={() => {
          return <Text style={styles.footer}>没有更多数据~</Text>;
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(238,238,237)',
  },
  item: {
    width: (width - 18) / 2,
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  img: {
    width: '100%',
    height: 250,
  },
  itemTitle: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 10,
    marginVertical: 4,
  },
  itemNameView: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  itemNameViewImg: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    resizeMode: 'contain',
  },
  itemNameViewText: {
    paddingLeft: 10,
    fontSize: 12,
    flex: 1,
  },
  itemNameViewHeart: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
  },
  itemNameViewHeartText: {
    fontSize: 12,
    paddingLeft: 5,
  },
  footer: {
    width: '100%',
    fontSize: 14,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Home;
