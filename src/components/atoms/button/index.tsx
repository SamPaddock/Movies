import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from '../../../assets/style/global';
import { useSelector } from 'react-redux';
import { RootState } from '../../../helper/redux/store';
import Label from '../label';

interface ButtonProps {
      type?: 'solid' | 'outline';
      title?: string;
      onPress: () => void;
      style?: ViewStyle;
      textStyle?: TextStyle;
      icon?: string;
      iconPosition?: 'left' | 'right';
      loading?: boolean;
      disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
      type = 'solid',
      title,
      onPress,
      style,
      textStyle,
      icon,
      iconPosition = 'left',
      loading = false,
      disabled = false,
}) => {
      const { theme } = useSelector((state: RootState) => state.preferences);
      const isOutline = type === 'outline';
      const buttonStyle: ViewStyle = [
            styles.button,
            isOutline ? styles.outlineButton : styles.solidButton,
            disabled && styles.disabledButton,
            style,
      ];

      const textButtonStyle: TextStyle = [
            styles.buttonText,
            isOutline ? styles.outlineButtonText : styles.solidButtonText,
            textStyle,
      ];

      return (
            <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled || loading}>
                  {
                        loading
                        ? <ActivityIndicator color={color[theme].accent} />
                        :
                              <>
                              {
                                    icon && iconPosition === 'left' &&
                                    <Icon name={icon} size={24} color={color.default.white} />
                              }
                              { title && <Label style={textButtonStyle} text={title} type='button' /> }
                              {
                                    icon && iconPosition === 'right' &&
                                    <Icon name={icon} size={24} color={color.default.white} />
                              }
                              </>
                  }
            </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
      button: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 8,
            gap: 8,
            height: 46,
      },
      solidButton: {
            backgroundColor: color.dark.primary,
      },
      outlineButton: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: color.dark.primary,
      },
      disabledButton: {
            backgroundColor: color.default.dimGray,
      },
      buttonText: {
            fontSize: 16,
      },
      solidButtonText: {
            color: color.default.white,
      },
      outlineButtonText: {
            color: color.dark.primary,
      },
});

export default Button;
