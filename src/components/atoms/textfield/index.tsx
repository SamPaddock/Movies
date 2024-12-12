// TextField.tsx
import React from 'react';
import { TextInput, StyleSheet, View, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Label from '../label';

interface TextFieldProps extends TextInputProps {
      label?: string;
      iconName?: string;
      iconColor?: string;
      textStyle?: TextStyle;
      inputContainer?: ViewStyle
}

const TextField: React.FC<TextFieldProps> = ({
      label,
      iconName,
      iconColor = '#333',
      style,
      textStyle,
      inputContainer,
      ...props
}) => {
      return (
            <View style={styles.container}>
                  {label && <Label style={textStyle} text={label} />}
                  <View style={[styles.inputContainer, inputContainer]}>
                        <TextInput
                              style={[styles.input, style]}
                              {...props}
                        />
                        {
                              iconName &&
                              <Icon
                                    name={iconName}
                                    size={24}
                                    color={iconColor}
                              />
                        }
                  </View>
            </View>
      );
};

const styles = StyleSheet.create({
      container: {
            flexGrow: 1,
      },
      inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 4,
            paddingHorizontal: 8,
            gap: 12,
      },
      input: {
            flex: 1,
            height: 46,
      },
});

export default TextField;
