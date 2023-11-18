import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home/Home';
import {launchImageLibrary} from 'react-native-image-picker';

const Bottom = createBottomTabNavigator();

const Main = () => {
  const Tab = ({state, descriptors, navigation}) => {
    const {routes, index} = state;
    const onPublishPress = async () => {
      const res = await launchImageLibrary({
        quality: 1,
        mediaType: 'photo',
        includeBase64: true,
      });
      console.log(res);
    };

    const TabStyles = StyleSheet.create({
      tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        backgroundColor: 'white',
      },
      tabItem: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon_tab_publish: {
        width: 58,
        height: 42,
        resizeMode: 'contain',
      },
    });

    return (
      <View style={TabStyles.tabContainer}>
        {routes.map((route, i) => {
          const option = descriptors[route.key].options;
          const isFocused = index === i;

          if (i === 2) {
            return (
              <TouchableOpacity
                key={route.key}
                style={styles.tabItem}
                onPress={onPublishPress}>
                <Image
                  style={TabStyles.icon_tab_publish}
                  source={require('../assets/icon_tab_publish.png')}
                />
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              style={TabStyles.tabItem}
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.5}>
              <Text
                style={{
                  fontSize: isFocused ? 18 : 16,
                  color: isFocused ? '#333' : '#999',
                  fontWeight: isFocused ? 'bold' : 'normal',
                }}
                key={route.key}>
                {option.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {/* eslint-disable-next-line react/no-unstable-nested-components */}
      <Bottom.Navigator tabBar={props => <Tab {...props} />}>
        <Bottom.Screen
          name={'Home'}
          component={Home}
          options={{
            title: '首页',
            headerShown: false,
          }}
        />
        <Bottom.Screen
          name={'Buy'}
          component={Home}
          options={{
            title: '购物',
            headerShown: false,
          }}
        />
        <Bottom.Screen
          name="Publish"
          component={Home}
          options={{
            title: '发布',
            headerShown: false,
          }}
        />
        <Bottom.Screen
          name={'Message'}
          component={Home}
          options={{
            title: '消息',
            headerShown: false,
          }}
        />
        <Bottom.Screen
          name={'My'}
          component={Home}
          options={{
            title: '我的',
            headerShown: false,
          }}
        />
      </Bottom.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});

export default Main;
