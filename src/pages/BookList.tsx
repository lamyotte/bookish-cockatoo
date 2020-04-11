import React from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../App';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'BookList'
>;

type RouteProps = RouteProp<RootStackParamList, 'BookList'>;

interface Props {
	navigation: NavigationProps;
	route: RouteProps;	
}

const mockBooks = [{ isbn: '9780316317610', name: 'The Binary Stars of Destiny', serie: 'Accel World'}];

export default function BookListPage({ route, navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockBooks}
        renderItem={({ item }) => <Button key={item.isbn} title={item.name} onPress={() =>  navigation.navigate('Book', { bookISBN: item.isbn })}>{item}</Button>}
      />
      <FloatingActionButton onPress={() => navigation.navigate('BarCodeScanner')}>
        <PlusIcon>+</PlusIcon>
      </FloatingActionButton>
    </View>
  );
}

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