import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { iconName } from '../../../constant/assetsType';

interface ButtonProps {
      name: iconName,
      size?: number,
      color: string,
      onPress?: () => void;
}

const IconView: React.FC<ButtonProps> = ({
      name,
      size = 24,
      color,
      onPress
}) => {
  return (
      <Icon
            name={name}
            size={size}
            color={color}
            onPress={onPress}
      />
  );
}

export default IconView;
