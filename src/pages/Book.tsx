import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
  'Book'
>;

type RouteProps = RouteProp<RootStackParamList, 'Book'>;

interface Props {
	navigation: NavigationProps;
	route: RouteProps;	
}

export default function BookPage({ route }: Props) {
	console.log('route', route);

	if (!route.params.bookISBN) {
		return <Text>ISBN invalid</Text>
	}

  return (
    <View style={styles.container}>
      <Text>ISBN: {route.params.bookISBN}</Text>
    </View>
  );
}
