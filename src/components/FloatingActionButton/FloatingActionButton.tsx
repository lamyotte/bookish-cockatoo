import React from 'react';
import styled from 'styled-components/native';

interface Props {
  onPress: () => void;
}

export function FloatingActionButton(props: Props) {
  return (
    <Container onPress={props.onPress}>
      <PlusIcon>+</PlusIcon>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
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