import React from 'react';
import { Text, TextStyle } from 'react-native';
import styles from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../../helper/redux/store';

type LabelType = 'header' | 'title' | 'body' | 'caption' | 'button' | 'link';

interface LabelProps {
      text: string;
      type?: LabelType;
      style?: TextStyle;
}

const Label = ({ text, type = 'body', style }: LabelProps) => {
      const { theme } = useSelector((state: RootState) => state.preferences);

      return <Text style={[styles(theme)[type], style]}>{text}</Text>;
};

export default Label;
