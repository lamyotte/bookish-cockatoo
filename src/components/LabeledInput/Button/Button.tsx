import React from 'react';
import styled from 'styled-components/native';

interface Props {
  onPress: () => void;
  text: string;
  backgroundColor?: string; 
}

export const Button = (props: Props) => {
  const backgroundColor = props.backgroundColor || '#2196f3';
  return (
    <ButtonContainer
      onPress={props.onPress}
      backgroundColor={backgroundColor}
    >
      <ButtonText>{props.text}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.TouchableOpacity`
	width: 100%;
	height: 40px
	padding: 12px;
	border-radius: 2px;	
	background-color: ${props => props.backgroundColor};
`;

const ButtonText = styled.Text`
	font-size: 15px;
	color: white;
	text-align: center;
`;