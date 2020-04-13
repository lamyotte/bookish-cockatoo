import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { BarCodeScanner, BarCodeEvent } from 'expo-barcode-scanner';
import { StackNavigationProp } from '@react-navigation/stack';
import { ToastAndroid } from 'react-native';

import { RootStackParamList } from '../../App';
import styled from 'styled-components/native';

import { getBookInfo } from '../services/BookApiService'
import { saveBook } from '../services/DatabaseService'

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'BarCodeScanner'
>;

interface Props {
  navigation: NavigationProps;
}

export default function BarCodeScannerPage({ navigation }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | undefined>(undefined);
  const [barCodeEvent, setBarCodeEvent] = useState<BarCodeEvent | undefined>(undefined);

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    askPermission();
  }, []);

  const handleBarCodeScanned = async (event: BarCodeEvent) => {
    if (event.data != barCodeEvent?.data) {

      // TODO: find book in book API
      // TODO: add book to DB

      setBarCodeEvent(event);
      ToastAndroid.show(`ISBN-13: ${event.data} has been scanned!`, ToastAndroid.SHORT);
      let book = await getBookInfo(event.data)
      console.log("HERE!")
      //await saveBook(book)
      console.log(book)
      await saveBook(book)
    }
  };

  if (hasPermission === undefined) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Layout>
      <StyledBarCodeScanned
        onBarCodeScanned={handleBarCodeScanned}
        barCodeTypes={['ean13']}
      />
      <DoneButton title='Done' onPress={navigation.goBack} />
    </Layout>
  );
}

const StyledBarCodeScanned = styled(BarCodeScanner)`
  width: 100%;
  flex: 1;
`

const Layout = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  flex-direction: column;
`;

const DoneButton = styled.Button`
  width: 100%;
  color: #4caf50;
  height: 40px;
`;