import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { List } from 'react-native-paper';

import { RootStackParamList } from '../../App';
import * as dbService from '../services/DatabaseService';
import { LabeledInput } from '../components/LabeledInput';
import { Button } from '../components/LabeledInput/Button';

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
  const [editMode, setEditMode]  = useState<boolean>(false);

  useEffect(() => {
    async function fetchBooks() {
      setBook(await dbService.getBookDetails(route.params.bookId));
    }
    fetchBooks();
  }, [])

	if (!route.params.bookId) {
		return <Text>Error</Text>
  }
  
  if (!book) {
    return <Text>Loading...</Text>
  }

  const startEditing = () => {
    // enable the inputs, do the things
    setEditMode(true)
  }

  const updateBook = () => {
    //get the data from the state and update the book

    setEditMode(false)
  }

  // TODO: add real img, author & categories

  return (
    <Layout>
      <Content>
      <Title>{book.title}</Title>
      <ResumeContainer>
        <Cover source={{ uri: 'http://books.google.com/books/content?id=zb0bDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api'}} />
        <Resume>
          <SerieAuthorContainer>
            <Serie>{book.series_name}</Serie>
            <Author>by {'Reki Kawahara'}</Author>
          </SerieAuthorContainer>
          <Categories>{'Sports, Shonen, BL'}</Categories>
        </Resume>
      </ResumeContainer>
      <List.Accordion
        title='Informations'
      >
        <LabeledInput label='ISBN 10' value={book.isbn_10} disabled />
        <LabeledInput label='ISBN 13' value={book.isbn_13} disabled />
      </List.Accordion>
      </Content>
      <Footer>
        {!editMode && <Button text='Edit Book' onPress={startEditing} />}
        {editMode && <Button text='Cancel' onPress={() => setEditMode(false)} backgroundColor='red' />}
        {editMode && <Button text='Done' onPress={updateBook} />}
      </Footer>
    </Layout>
  );
}

const Layout = styled.View`
  flex: 1;
  background-color: #fff;  
`;

const Content = styled.ScrollView`
  flex-direction: column;
  padding: 8px 12px;
`;

const Footer = styled.View`
  width: 40px;
  width: 100%;
  background-color: yellow;
`;

const Title = styled.Text`
  font-size: 24px;
  width: 100%;
  margin-bottom: 8px;
`;

const ResumeContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const Cover = styled.Image`
  height: 165px;
  width: 110px;
`;

const Resume = styled.View`
  flex-direction: column;
  padding: 8px;
`;

const SerieAuthorContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

const Serie = styled.Text`
  font-size: 20px;
`;

const Author = styled.Text`
  font-size: 20px;
`;

const Categories = styled.Text`
  font-size: 20px;
  flex: 1;
`;
