import React from 'react';
import {
  OverlayBackground,
  OverlayContainer,
  OverlayContent,
  OverlayText,
  OverlayButtonRow,
} from '../../../style/components/overlay';
import { ButtonOutline, ButtonPrimary } from '../../../style/components/button';

const DialogConfirm = (props) => {
  return (
    <OverlayBackground>
      <OverlayContainer>
        <OverlayContent width="400px">
          <OverlayText>{props.question}</OverlayText>
          <OverlayButtonRow>
            <ButtonOutline onClick={props.fnCancel}>No</ButtonOutline>
            <ButtonPrimary onClick={props.fnConfirm}>Yes</ButtonPrimary>
          </OverlayButtonRow>
        </OverlayContent>
      </OverlayContainer>
    </OverlayBackground>
  );
};

export default DialogConfirm;
