import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';


interface Props {
  id: string;
  text: string;
  onPress: () => void;
  thumbnail?: string;
  subText?: string;
}

export function ListItem(props: Props) {
  return (
    <Container onPress={props.onPress} key={props.id}>
      {!!props.thumbnail && <Thumbnail source={{ uri: props.thumbnail}} />}
      <TextContainer>
        <Text>{props.text}</Text>
        {!!props.subText && <SubText>{props.subText}</SubText>}
      </TextContainer>
    </Container>
  );
}



const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 5px;
  border-color: #e2e8f0;
  border-bottom-width: 1px;
`;

const Thumbnail = styled.Image`
  width: 40px;
  height: 60px;
  padding-left: 5px;
`;

const TextContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;	
  justify-content: space-around;
  height: 100%;
  padding-left: 5px;
`;

const Text = styled.Text`
  color: #4a5568;
  font-size: 20px;
  width: 100%;
`;

const SubText = styled.Text`
  color: #718096;
  font-size: 18px;  
  width: 100%;
`;