import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import BarCodeScannerPage from './src/pages/BarCodeScanner';
import BookPage from './src/pages/Book';
import BookListPage from './src/pages/BookList';
import SerieListPage from './src/pages/SerieList';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  BarCodeScanner: undefined;
  Book: { bookId: string };
  BookList: { serieId: string};
  SerieList: undefined;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>     
        <Stack.Screen name="SerieList" component={SerieListPage} /> 
        <Stack.Screen name="BookList" component={BookListPage} />
        <Stack.Screen name="BarCodeScanner" component={BarCodeScannerPage} />
        <Stack.Screen name="Book" component={BookPage} />      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
