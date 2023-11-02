import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Welcome = () => {
  /**
   *
   * @type {StackNavigationProp<ReactNavigation.RootParamList>}
   */
  const navigate = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate.replace('Login');
    }, 3000);
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
