import styled from 'styled-components';
import loginBackground from '../../assets/img/bg_login.png';

// HEADER

export const AuthHeaderContainer = styled.header`
  background-image: url(${loginBackground}),
    ${(props) => props.theme.gradientMain};
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: ${(props) => props.theme.shadowButton};
  color: ${(props) => props.theme.colorLight};
  display: grid;
  grid-template-rows: 1fr auto;
  justify-content: center;
`;

export const AuthHeaderBranding = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spaceL} ${(props) => props.theme.spaceL} 0
    ${(props) => props.theme.spaceL};
`;

export const AuthHeaderLogo = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: ${(props) => props.theme.spaceS};
`;

export const AuthHeaderLogoText = styled.p`
  font-size: 30px;
  margin-bottom: ${(props) => props.theme.spaceM};
`;

export const AuthHeaderClaim = styled.p`
  opacity: 0.7;
  text-align: center;
  font-weight: ${(props) => props.theme.textWeightThin};
  line-height: 1.5;
  max-width: 280px;
  margin-bottom: ${(props) => props.theme.spaceL};
`;

export const AuthHeaderStoreWrapper = styled.div``;

export const AuthHeaderFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spaceL};
`;

export const AuthHeaderSocial = styled.div`
  margin-bottom: ${(props) => props.theme.spaceL};
  text-align: center;
  display: flex;
`;

export const AuthHeaderCopyright = styled.p`
  font-size: ${(props) => props.theme.textSizeS};
  text-align: center;
`;

// CONTENTS

export const AuthContentContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  margin: ${(props) => props.theme.spaceL};
  position: relative;
`;

export const FloatingButtonContainer = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: ${(props) => props.theme.spaceM};
`;

export const AuthConfirmationText = styled.p`
  text-align: center;
`;

export const AuthFormContainer = styled.form`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  grid-auto-rows: ${(props) => props.theme.controlHeightLarge};
  grid-row-gap: ${(props) => props.theme.spaceM};
  justify-content: center;
`;

export const AuthFormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spaceM};
`;

export const AuthFormGrid = styled.div`
  width: 320px;
  display: grid;
  grid-row-gap: ${(props) => props.theme.spaceL};
`;

export const AuthFormGridDouble = styled(AuthFormGrid)`
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${(props) => props.theme.spaceXL};
  width: 100%;
  max-width: 640px;
`;

export const AuthFormFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AuthFormProgressWrapper = styled.div`
  margin-top: ${(props) => props.theme.spaceL};
  margin-bottom: ${(props) => props.theme.spaceS};
  display: flex;
  justify-content: center;
  align-items: center;
`;
