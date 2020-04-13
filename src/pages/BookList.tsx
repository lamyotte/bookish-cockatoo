import React, { useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../App';
import * as dbService from '../services/DatabaseService';
import { RouteProp } from '@react-navigation/native';
import { ListItem } from '../components/ListItem';
import { FloatingActionButton } from '../components/FloatingActionButton';

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'BookList'
>;

type RouteProps = RouteProp<RootStackParamList, 'BookList'>;

interface Props {
  navigation: NavigationProps;
  route: RouteProps;
}

export default function BookListPage({ route, navigation }: Props) {
  const [books, setBooks] = useState<dbService.Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      setBooks(await dbService.getBooksInSeries(route.params.serieId));
    }
    fetchBooks();
  }, [])

  if (!route.params.serieId) {
    return <Text>Error</Text>
  }

  if (!books) {
    return <Text>Loading...</Text>
  }


  return (
    <Layout>
      <FlatList
        data={books}
        renderItem={({ item }) =>
          <ListItem
            id={item.book_id}
            text={item.title}
            subText={item.series_name}
            thumbnail={item.img} // TODO: add real thumbnail (imageLinks.smallThumbnail)
            onPress={() => navigation.navigate('Book', { bookId: item.book_id })}
          />
        }
      />
      <FloatingActionButton onPress={() => navigation.navigate('BarCodeScanner')} />
    </Layout>
  );
}

const Layout = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  width: 100%;
`;

