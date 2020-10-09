import styled from 'styled-components';
import { Flyout } from '../components/flyout';

// BUTTON RESET
const ButtonReset = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: 0.1 s;
`;

// WRAPPER (USED E.G. FOR FLYOUTS)
export const ButtonWrapper = styled.div`
  position: relative;
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : 0)};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 0)};
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : 0)};
`;

// STANDARD BUTTONS
export const ButtonStandard = styled(ButtonReset)`
  height: ${(props) => props.theme.controlHeight};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  min-width: 120px;
  font-size: ${(props) => props.theme.textSizeS};
  border-radius: ${(props) => props.theme.controlHeight};
  opacity: 0.9;
  outline: none;
  margin-left: ${(props) => (props.hasMarginLeft ? props.theme.spaceM : 0)};
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 ${(props) => props.theme.spaceM};

  :hover {
    opacity: 1;
  }
`;

export const ButtonOutline = styled(ButtonStandard)`
  border: 1px solid rgba(0, 0, 0, 0.2);

  :hover {
    background-color: ${(props) => props.theme.colorGreySuperLight};
  }
`;

export const ButtonOutlineWhite = styled(ButtonStandard)`
  border-radius: ${(props) => props.theme.controlHeight};
  border: 2px solid rgba(255, 255, 255, 0.6);
  margin: 2px ${(props) => props.theme.spaceXS};
  padding: 0 ${(props) => props.theme.spaceM};
  opacity: 0.9;
`;

export const ButtonPrimary = styled(ButtonStandard)`
  box-shadow: ${(props) => props.theme.shadowButton};
  background-image: ${(props) => props.theme.gradientMain};
  color: ${(props) => props.theme.colorLight};

  :active {
    box-shadow: none;
  }
`;

export const ButtonPrimaryLarge = styled(ButtonPrimary)`
  height: ${(props) => props.theme.controlHeightLarge};
  width: 260px;
`;

// ICON BUTTONS
export const ButtonIcon = styled(ButtonReset)`
  width: ${(props) => props.theme.controlHeight};
  height: ${(props) => props.theme.controlHeight};
  position: relative;
  font-family: 'Material Icons';
  font-size: 24px;
  color: ${(props) => props.theme.colorGrey};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : 0)};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  :hover {
    color: ${(props) => props.theme.colorGreyDark};
  }
`;

export const ButtonIconBadge = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-image: ${(props) => props.theme.gradientMain};
  font-size: 10px;
  color: ${(props) => props.theme.colorLight};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: -6px;
`;

export const ButtonFlyoutContainer = styled(Flyout)`
  ${ButtonWrapper}:hover & {
    display: block;
  }
`;

export const ButtonIconGrey = styled(ButtonIcon)`
  border-radius: ${(props) => props.theme.controlHeightLarge};
  background-color: ${(props) => props.theme.colorGreySuperLight};
  opacity: 0.8;
  font-size: 22px;

  :hover {
    opacity: 1;
  }
`;

export const ButtonIconGreySmall = styled(ButtonIcon)`
  width: ${(props) => props.theme.controlHeightSmall};
  height: ${(props) => props.theme.controlHeightSmall};
  border-radius: ${(props) => props.theme.controlHeightSmall};
  background-color: ${(props) => props.theme.colorGreySuperLight};
  opacity: 0.8;
  font-size: 16px;

  :hover {
    opacity: 1;
  }
`;

export const ButtonIconWhite = styled(ButtonIcon)`
  border-radius: ${(props) => props.theme.controlHeightLarge};
  background-color: ${(props) => props.theme.colorLight};
  opacity: 0.6;
  color: ${(props) => props.theme.colorMain};
  margin: ${(props) => props.theme.spaceXS};
  mix-blend-mode: overlay;

  :hover {
    opacity: 1;
    color: ${(props) => props.theme.colorMain};
  }
`;

export const ButtonIconPrimary = styled(ButtonIcon)`
  background-image: ${(props) => props.theme.gradientMain};
  color: ${(props) => props.theme.colorLight};
  border-radius: ${(props) => props.theme.controlHeightLarge};
  opacity: 0.9;
  font-size: 20px;

  :hover {
    color: ${(props) => props.theme.colorLight};
    opacity: 1;
  }

  :active {
    box-shadow: none;
  }
`;

export const ButtonIconPrimaryLarge = styled(ButtonIconPrimary)`
  width: ${(props) => props.theme.controlHeightLarge};
  height: ${(props) => props.theme.controlHeightLarge};
  box-shadow: ${(props) => props.theme.shadowButton};
  font-size: 24px;
`;

export const ButtonIconPrimarySmall = styled(ButtonIconPrimary)`
  width: ${(props) => props.theme.controlHeightSmall};
  height: ${(props) => props.theme.controlHeightSmall};
  box-shadow: ${(props) => props.theme.shadowButton};
  font-size: 16px;
`;

// MIXED BUTTONS
export const ButtonMixed = styled(ButtonReset)`
  width: auto;
  height: auto;
  font-size: ${(props) => props.theme.textSizeS};
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colorDark};
  opacity: 0.6;
  margin-right: ${(props) => props.theme.spaceM};

  :hover {
    opacity: 1;
  }
`;

export const ButtonMixedIcon = styled.p`
  font-size: 20px;
  font-family: 'Material Icons';
  margin-right: ${(props) => props.theme.spaceXXS};
  color: ${(props) =>
    props.isActive ? props.theme.colorMain : props.theme.colorGrey};
`;

// FLYOUT BUTTONS
export const ButtonFlyout = styled(ButtonReset)`
  min-width: 160px;
  width: auto;
  height: ${(props) => props.theme.controlHeight};
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colorDark};
  padding: 0 ${(props) => props.theme.spaceS};

  :hover {
    background-color: ${(props) => props.theme.colorGreySuperLight};
  }
`;

export const ButtonFlyoutIcon = styled.p`
  font-size: 22px;
  font-family: 'Material Icons';
  margin-right: ${(props) => props.theme.spaceS};
  color: ${(props) => props.theme.colorGrey};

  ${ButtonFlyout}:hover & {
    color: ${(props) => props.theme.colorGreyDark};
  }
`;

// FAKE BUTTONS (used for fileinput)
export const FakeButtonOutline = styled.div`
  height: ${(props) => props.theme.controlHeight};
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  min-width: 120px;
  font-size: ${(props) => props.theme.textSizeS};
  border-radius: ${(props) => props.theme.controlHeight};
  opacity: 0.9;
  outline: none;
  margin-left: ${(props) => (props.hasMarginLeft ? props.theme.spaceM : 0)};
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 ${(props) => props.theme.spaceM};
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;

  :hover {
    opacity: 1;
    background-color: ${(props) => props.theme.colorGreySuperLight};
  }
`;

export const FakeButtonIcon = styled.div`
  width: ${(props) => props.theme.controlHeight};
  height: ${(props) => props.theme.controlHeight};
  position: relative;
  font-family: 'Material Icons';
  font-size: 24px;
  color: ${(props) => props.theme.colorGrey};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : 0)};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : 0)};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  :hover {
    color: ${(props) => props.theme.colorGreyDark};
  }
`;
