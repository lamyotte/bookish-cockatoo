import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home';
import BarCodeScanner from './src/pages/BarCodeScanner';
import Book from './src/pages/Book';
import BookList from './src/pages/BookList';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  BarCodeScanner: { addBook: (isbn: string) => void};
  Book: { bookISBN: string };
  BookList: { books: string[]};
};

export default function App() {
  const [books, setBooks] = useState<string[]>([]); // TODO: list of books fetched from DB
  
  const addBook = (isbn: string) => {
    // TODO: add book to DB
    setBooks(oldBooks => [...oldBooks, isbn])
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />        
        <Stack.Screen name="BarCodeScanner" component={BarCodeScanner} initialParams={{ addBook }} />
        <Stack.Screen name="Book" component={Book} />        
        <Stack.Screen name="BookList" component={BookList} initialParams={{ books }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
