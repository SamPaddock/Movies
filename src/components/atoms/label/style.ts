import { StyleSheet, TextStyle } from 'react-native';
import { color } from '../../../assets/style/global';

interface Styles {
  [key: string]: TextStyle;
}

const styles = (theme = 'dark'): Styles => StyleSheet.create({
      title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: color[theme].textPrimary,
      },
      header: {
            fontSize: 20,
            fontWeight: 'bold',
            color: color[theme].textPrimary,
      },
      body: {
            fontSize: 16,
            color: color[theme].textPrimary,
      },
      button: {
            fontSize: 16,
            fontWeight: 'bold',
            color: color[theme].textPrimary,
      },
      link: {
            fontSize: 16,
            textDecorationLine: 'underline',
            textDecorationColor: 'blue',
            color: color.default.blue,
      },
      caption: {
            fontSize: 12,
            color: color[theme].textPrimary,
      },
});

export default styles;
