import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Header = () => {
  const [ActivateTitle, setActivateTitle] = useState(1);

  return (
    <View style={styles.header}>
      <Image
        style={styles.leftImg}
        source={require('../../../assets/icon_daily.png')}
      />
      <View style={styles.aaa}>
        <TouchableOpacity
          onPress={() => {
            setActivateTitle(0);
          }}>
          <Text
            style={[
              styles.text,
              ActivateTitle === 0 ? styles.activateText : {},
            ]}>
            关注
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActivateTitle(1);
          }}>
          <Text
            style={[
              styles.text,
              ActivateTitle === 1 ? styles.activateText : {},
            ]}>
            发现
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActivateTitle(2);
          }}>
          <Text
            style={[
              styles.text,
              ActivateTitle === 2 ? styles.activateText : {},
            ]}>
            合肥
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Image
          style={styles.rightImg}
          source={require('../../../assets/icon_search.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  aaa: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
  },
  activateText: {
    color: 'black',
    borderBottomColor: 'rgb(255,32,63)',
    borderBottomWidth: 2,
    borderRadius: 1,
  },
  text: {
    color: 'rgb(151,151,151)',
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  header: {
    width: '100%',
    height: 48,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomColor: 'rgb(227,227,227)',
    borderBottomWidth: 2,
  },
  leftImg: {
    width: 28,
    height: 28,
    resizeMode: 'cover',
  },
  rightImg: {
    width: 28,
    height: 28,
    resizeMode: 'cover',
  },
});

export default Header;
