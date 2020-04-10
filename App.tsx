import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home';
import BarCodeScanner from './src/pages/BarCodeScanner';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  BarCodeScanner: undefined;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />        
        <Stack.Screen name="BarCodeScanner" component={BarCodeScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
