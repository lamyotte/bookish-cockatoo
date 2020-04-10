import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
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

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp
}

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: cockatoo}}></Image>
      <Button
        title="Go to BarCodeScanner"
        onPress={() => navigation.navigate('BarCodeScanner')}
      />
    </View>
  );
}
