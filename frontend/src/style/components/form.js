import styled from 'styled-components';

export const FormField = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.colorGreySuperLight};
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  width: 100%;
  grid-column: ${(props) => (props.span ? 'span ' + props.span : 'auto')};
`;

export const FormFieldNoBorder = styled(FormField)`
  border: none;
`;

export const FormFieldIcon = styled.p`
  font-family: 'Material Icons';
  color: ${(props) => props.theme.colorMain};
  height: 100%;
  width: 20px;
  display: flex;
  align-items: center;
  margin-right: ${(props) => props.theme.spaceM};
  margin-left: 1px;
  padding-bottom: 1px;
  font-size: 22px;
`;

export const FormLabel = styled.label`
  display: grid;
  position: relative;
  width: 100%;
`;

export const FormLabelText = styled.p`
  color: ${(props) => props.theme.colorGrey};
  font-size: ${(props) => props.theme.textSizeS};
`;
