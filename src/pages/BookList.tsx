import React, { useEffect, useState } from 'react';
import { Button, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../App';
import * as dbService from '../services/DatabaseService';

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'BookList'
>;

interface Props {
	navigation: NavigationProps;
}

export default function BookListPage({ navigation }: Props) {
  const [books, setBooks] = useState<dbService.Book[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      setBooks(await dbService.listBooks());
    }
    fetchBooks();
  }, [])


  return (
    <Layout>
      <FlatList
        data={books}
        renderItem={({ item }) => <Button key={item.book_id} title={item.title} onPress={() =>  navigation.navigate('Book', { bookId: item.book_id })} />}
      />
      <FloatingActionButton onPress={() => navigation.navigate('BarCodeScanner')}>
        <PlusIcon>+</PlusIcon>
      </FloatingActionButton>
    </Layout>
  );
}

const Layout = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const FloatingActionButton = styled.TouchableOpacity`
  position: absolute;
  width: 50px
  height: 50px;
  align-items: center;
  justify-content: center;
  right: 20px;
  bottom: 20px;
  background-color: #03A9F4;
  border-radius: 25px;
  
`;
// TODO: change for a svg
const PlusIcon = styled.Text` 
  font-size: 30px;
  color: white;
`