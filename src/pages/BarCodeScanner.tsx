import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../App';

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'BarCodeScanner'
>;

type RouteProps = RouteProp<RootStackParamList, 'BarCodeScanner'>;

interface Props {
	navigation: NavigationProps;
	route: RouteProps;	
}

export default function BarCodeScannerPage({ route, navigation }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    askPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
		setScanned(true);
		route.params.addBook(data);
    alert(`ISBN-13: ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
        {!scanned && 
					<BarCodeScanner
						onBarCodeScanned={handleBarCodeScanned}
						barCodeTypes={['ean13']}
						style={StyleSheet.absoluteFillObject}
					/>
        }     
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}