import React from 'react';
import {StatusBar, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import welcome from './pages/Welcome';
import login from './pages/Login';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Welcome'}>
          <Stack.Screen
            name="Welcome"
            component={welcome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={'Login'}
            component={login}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
