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
        renderItem={({ item }) => <Button key={item.book_id} title={item.title} onPress={() =>  navigation.navigate('Book', { bookId: item.book_id })} />}
      />
      <FloatingActionButton onPress={() => navigation.navigate('BarCodeScanner')}>
        <PlusIcon>+</PlusIcon>
      </FloatingActionButton>
        renderItem={({ item }) => 
          <ListItem 
            id={item.book_id}
            text={item.title}
            subText={'Haikyuu'}
            thumbnail={'http://books.google.com/books/content?id=zb0bDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api'}
            onPress={() => navigation.navigate('Book', { bookId: item.book_id })}
          />
        }
      />  
    </Layout>
  );
}

const Layout = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  width: 100%;
`;

