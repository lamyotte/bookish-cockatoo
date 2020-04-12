import React from 'react';
import styled from 'styled-components/native';


interface Props {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
}

export function LabeledInput(props: Props) {
  return (
    <Group>
      <Label>{props.label}</Label>
      <Input value={props.value} editable={!props.disabled} />
    </Group>
  );
}

const Group = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  align-items: center;
`;

const Label = styled.Text`
  font-size: 20px;
  margin-right: 8px;
`;

const Input = styled.TextInput`
  border: 1px solid #e2e8f0;
  font-size: 18px;
  padding: 4px;
  flex: 1;
`;
