import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "Roboto", sans-serif;

    *:focus {
      outline: none;
    }
  }

  .masonry_column {
    padding-left: 36px; /* gutter size */
  }

  .react_tinylink_card {
    height: auto;
    border-radius: 4px;
    color: rgba(0,0,0,0.7);
    box-shadow: none;
    transition: 0.1s;
    z-index: 0;
  }
  .react_tinylink_card_content_wrapper {
    padding: 12px;
  }
  .react_tinylink_card_content_header_description {
    font-size: 12px;
  }
  .react_tinylink_card_content {
    margin: 8px 0;
  }
  .react_tinylink_card_content_description {
    font-size: 12px;
    line-height: 16px;
  }
  .react_tinylink_card_footer_description {
    font-size: 12px;
  }
`;

export const defaultTheme = {
  // colors
  colorMain: '#c468ff',
  colorMainLight: '#6e91f6',
  colorGrey: 'rgba(0,0,0,0.4)',
  colorGreySuperLight: 'rgba(0,0,0,0.05)',
  colorGreyLight: 'rgba(0,0,0,0.15)',
  colorGreyDark: 'rgba(0,0,0,0.7)',
  colorDark: '#000000',
  colorLight: '#ffffff',
  colorBG: '#f8f8f9',
  colorWarning: '#EDF67D',
  gradientMain: 'linear-gradient(135deg, #c468ff 10%, #6e91f6 100%)',
  shadowButton: '0 2px 20px 0 rgba(197, 104, 255, 0.15)',
  shadowTile: '0 10px 20px 0 rgba(0, 0, 0, 0.05), 0 0 1px 0 rgba(0, 0, 0, 0.2)',
  // size stuff
  controlHeight: '40px',
  controlHeightSmall: '32px',
  controlHeightLarge: '60px',
  barHeight: '80px',
  controlledWidth: '1200px',
  spaceXXS: '6px',
  spaceXS: '8px',
  spaceS: '16px',
  spaceM: '24px',
  spaceL: '36px',
  spaceXL: '60px',
  spaceXXL: '80px',
  spaceXXXL: '100px',
  radiusDefault: '4px',
  // font stuff
  textSizeXL: '40px',
  textSizeL: '24px',
  textSizeM: '16px',
  textSizeS: '12px',
  textWeightThin: '300',
  textWeightRegular: '400',
  textWeightMedium: '500',
  textWeightBold: '700',
};
