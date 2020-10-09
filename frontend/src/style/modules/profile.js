import styled from 'styled-components';
import { H2 } from '../typography';
import { FormLabelText } from '../components/form';

export const ProfileBackground = styled.div`
  height: 240px;
  width: 100%;
  background-color: ${(props) => props.theme.colorGreySuperLight};
  background-image: ${(props) => `url(${props.file})`};
  background-position: center;
  background-size: cover;
  background-repeat: none;
`;

export const ProfileHeader = styled.div`
  margin-top: -120px;
  background-color: ${(props) => props.theme.colorLight};
  box-shadow: ${(props) => props.theme.shadowTile};
  border-radius: ${(props) => props.theme.radiusDefault};
  width: 100%;
  display: grid;
  grid-template-columns: 25% 75%;
  position: relative;
`;

export const ProfileSummary = styled.div`
  padding: ${(props) => props.theme.spaceXL};
  border-right: 2px solid ${(props) => props.theme.colorGreySuperLight};
  text-align: center;
  display: grid;
  grid-template-rows: 1fr auto;
`;

export const ProfileSummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spaceL};
`;

export const ProfileSummaryUserName = styled(H2)`
  margin-top: ${(props) => props.theme.spaceS};
  margin-bottom: ${(props) => props.theme.spaceXS};
`;

export const ProfileSummaryUserLocation = styled.p``;

export const ProfileSummaryActions = styled.div`
  display: grid;
  grid-row-gap: ${(props) => props.theme.spaceS};
`;

export const ProfileDetailsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  height: 100%;
`;

export const ProfileDetails = styled.div`
  display: grid;
  align-items: top;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${(props) => props.theme.spaceXL};
  grid-row-gap: ${(props) => props.theme.spaceL};
  padding: ${(props) => props.theme.spaceXL};
`;

export const ProfileDetailBlock = styled.div``;

export const ProfileDetailBlockTitle = styled(FormLabelText)`
  margin-bottom: ${(props) => props.theme.spaceS};
`;

export const ProfileTagWrapper = styled.div`
  padding-top: ${(props) => (props.paddingTop ? props.theme.spaceXS : 0)};
  margin-bottom: ${(props) => props.theme.spaceS};
  display: flex;
  flex-wrap: wrap;
`;

export const ProfileTagAdder = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: ${(props) => props.theme.spaceM};
`;

export const ProfileBannerButtonContainer = styled.div`
  position: absolute;
  right: 2px;
  top: 0;
  margin-top: -40px;
`;

export const ProfileBannerButton = styled.div`
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ProfileBannerButtonIcon = styled.p`
  font-family: 'Material Icons';
  font-size: 22px;
  margin-right: ${(props) => props.theme.spaceS};
`;

export const ProfileSubNavi = styled.ul`
  border-top: 2px solid ${(props) => props.theme.colorGreySuperLight};
  height: 120px;
  display: grid;
  grid-gap: ${(props) => props.theme.spaceXL};
  grid-template-columns: repeat(5, 1fr);
  padding: 0 ${(props) => props.theme.spaceXL};
`;

export const ProfileNaviItem = styled.li`
  list-style: none;
  border-bottom: 2px solid;
  border-bottom-color: ${(props) =>
    props.isActive ? `${props.theme.colorMain}` : 'transparent'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2px;
  cursor: pointer;

  :hover {
    border-bottom-color: ${(props) =>
      props.isActive ? `${props.theme.colorMain}` : `${props.theme.colorGrey}`};
  }
`;

export const ProfileNaviItemNumber = styled(H2)`
  margin-bottom: ${(props) => props.theme.spaceXS};
`;

export const ProfileNaviItemText = styled.p`
  color: ${(props) => props.theme.colorGrey};
`;
