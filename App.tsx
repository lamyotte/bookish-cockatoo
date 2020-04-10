import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

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

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Wow ok. Open up App.tsx to start working on your app!</Text> */}
      <Image style={styles.image} source={{ uri: cockatoo}}></Image>
    </View>
  );
}
