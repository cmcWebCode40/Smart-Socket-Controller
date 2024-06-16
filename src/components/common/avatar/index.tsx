import {Image, ImageProps, ImageSourcePropType, StyleSheet} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import MockedAvatar from '../../../../assets/images/mock_avatar.png';
import {Theme} from '@/libs/config/theme';

interface AvatarProps extends ImageProps {
  source?: ImageSourcePropType;
}

export const Avatar: React.FunctionComponent<AvatarProps> = ({
  style: customStyles,
  source = MockedAvatar,
  ...otherImageProps
}) => {
  const style = useThemedStyles(styles);
  return (
    <Image
      source={source}
      {...otherImageProps}
      style={[style.image, customStyles]}
    />
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    image: {
      height: 45,
      width: 45,
      borderRadius: theme.radius.full,
    },
  });
};
