import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../../App';

const cockatoo = 'https://cockatoo-info.com/wp-content/uploads/2019/07/cockatoo-walking-cacatua-alba-768x668.jpg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
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

export default function BookListPage({ route, navigation }: Props) {
  return (
    <View style={styles.container}>
        {route.params.books.map(book => <Button title={book} onPress={() =>  navigation.navigate('Book', { bookISBN: book })}>{book}</Button>)}
    </View>
  );
}
