/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import BLE from './src/BLE';

AppRegistry.registerComponent(appName, () => BLE);
