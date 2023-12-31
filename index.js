/**
 * @format
 */

import {AppRegistry, UIManager} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// 开启layoutanimation
UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent(appName, () => App);
