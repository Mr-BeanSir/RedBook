import React, {useRef} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CategoryModal from './CategoryModal';

const CategoryHeader = ({categoryData, all}) => {
  const modalRef = useRef();
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {categoryData.map((item, index) => {
          return (
            <TouchableOpacity key={`${item.name}`} style={styles.tabItem}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          modalRef.current?.show();
        }}>
        <Image
          source={require('../../../assets/icon_arrow.png')}
          style={styles.openImg}
        />
      </TouchableOpacity>

      <CategoryModal ref={modalRef} categoryData={all} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 6,
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  openButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  openImg: {
    width: 18,
    height: 18,
    transform: [{rotate: '-90deg'}],
  },
  tabItem: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItemTxt: {
    fontSize: 16,
    color: '#999',
  },
  tabItemTxtSelected: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default CategoryHeader;
