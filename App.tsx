import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import BarCodeScannerPage from './src/pages/BarCodeScanner';
import BookPage from './src/pages/Book';
import BookListPage from './src/pages/BookList';
import SerieListPage from './src/pages/SerieList';

import { getBookInfo } from './src/services/BookApiService'
import { setupDatabase, saveBook, listBooks, getBooksInSeries } from './src/services/DatabaseService'

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  BarCodeScanner: undefined;
  Book: { bookId: string };
  BookList: { serieId: string};
  SerieList: undefined;
};

export default function App() {
  useEffect(() => {
    setupDatabase()
  });

  const addBook = async (isbn: string) => {
    // TODO: add book to DB
    let book = await getBookInfo(isbn)
    await saveBook(book)
    let books = await listBooks()
    console.log(books)
    let books_in = await getBooksInSeries(1)
    console.log(books_in)
  }
  
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
