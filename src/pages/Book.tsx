import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../App';
import * as dbService from '../services/DatabaseService';

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'Book'
>;

type RouteProps = RouteProp<RootStackParamList, 'Book'>;

interface Props {
	navigation: NavigationProps;
	route: RouteProps;	
}

export default function BookPage({ route }: Props) {
  const [book, setBook] = useState<dbService.BookDetails | undefined>(undefined);

  useEffect(() => {
    async function fetchBooks() {
      setBook(await dbService.getBookDetails(route.params.bookId));
    }
    fetchBooks();
  }, [])

	if (!route.params.bookId) {
		return <Text>ISBN invalid</Text>
  }
  
  if (!book) {
    return <Text>Loading...</Text>
  }

  return (
    <Layout>
      <Text>{JSON.stringify(book, null, 2)}</Text>
    </Layout>
  );
}

const Layout = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;