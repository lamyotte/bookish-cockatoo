import React, { useEffect, useState } from 'react';
import { Button, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../App';
import * as dbService from '../services/DatabaseService';
import { ListItem } from '../components/ListItem';
import { FloatingActionButton } from '../components/FloatingActionButton';

type NavigationProps = StackNavigationProp<
  RootStackParamList,
  'SerieList'
>;

interface Props {
	navigation: NavigationProps;
}

export default function SerieListPage({ navigation }: Props) {
  const [series, setSeries] = useState<dbService.Serie[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      setSeries(await dbService.listSeries());
    }
    fetchBooks();
  }, [])


  return (
    <Layout>
      <FlatList
        data={series}
        renderItem={({ item }) => 
          <ListItem 
            id={item.series_id}
            text={item.series_name}
            onPress={() => navigation.navigate('BookList', { serieId: item.series_id })}
          />
        }
      />
      <FloatingActionButton onPress={() => navigation.navigate('BarCodeScanner')} />
    </Layout>
  );
}

const Layout = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  width: 100%;
`;