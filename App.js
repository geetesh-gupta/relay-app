import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import BLE from './src/pages/BLE.js';
import ML from './src/pages/ML.js';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={BLE} />
        <Stack.Screen name="ML" component={ML} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
