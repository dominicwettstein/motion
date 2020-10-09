import styled from 'styled-components';

export const Input = styled.input`
  height: ${(props) => props.theme.controlHeight};
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
`;

export const InputFullHeight = styled(Input)`
  height: 100%;
`;

export const InputArea = styled.textarea`
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  min-height: ${(props) => props.theme.controlHeight};
  padding-top: ${(props) => props.theme.spaceXS};
  word-wrap: break-word;
`;

export const HiddenInput = styled.input`
  display: none;
`;
