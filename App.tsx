import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import BarCodeScanner from './src/pages/BarCodeScanner';
import Book from './src/pages/Book';
import BookList from './src/pages/BookList';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  BarCodeScanner: undefined;
  Book: { bookId: string };
  BookList: undefined;
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>      
        <Stack.Screen name="BookList" component={BookList} />
        <Stack.Screen name="BarCodeScanner" component={BarCodeScanner} />
        <Stack.Screen name="Book" component={Book} />      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
