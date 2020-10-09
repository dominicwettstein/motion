import React from 'react';
import { v1 as uuidv1 } from 'uuid';

import {
  ProfileSubNavi,
  ProfileNaviItem,
  ProfileNaviItemNumber,
  ProfileNaviItemText,
} from '../../../style/modules/profile';

const ProfileNavi = (props) => {
  return (
    <ProfileSubNavi>
      {Object.keys(props.categories).length > 0 ? (
        <>
          {' '}
          {Object.keys(props.categories).map((key) => {
            return (
              <ProfileNaviItem
                isActive={key === props.activeFilter}
                onClick={() => props.fnSetFilter(key)}
                key={uuidv1()}
              >
                <ProfileNaviItemNumber>
                  {props.categories[key]}
                </ProfileNaviItemNumber>
                <ProfileNaviItemText>{key}</ProfileNaviItemText>
              </ProfileNaviItem>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </ProfileSubNavi>
  );
};

export default ProfileNavi;
