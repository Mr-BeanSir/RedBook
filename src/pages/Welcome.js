import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {get} from '../utils/Storage';

const Welcome = () => {
  const navigate = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      let account = await get('account');
      if (account) {
        navigate.replace('HomeTab');
      } else {
        navigate.replace('Login');
      }
    }, 100);
  }, []);

  return (
    <View style={styles.main}>
      <Image
        style={styles.img}
        source={require('../assets/icon_main_logo.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Welcome;
