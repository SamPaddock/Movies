import { Dimensions, StyleSheet } from 'react-native';
import { color } from '../../../assets/style/global';

const styles = StyleSheet.create({
      container: {
            width: Dimensions.get('screen').width,
            flexDirection: 'row',
            paddingTop: 60,
            paddingBottom: 12,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            backgroundColor: color.dark.primary,
      },
      transparentStyle:{
            backgroundColor: '#00000000',
      },
      transparentIconContainer:{
            backgroundColor: '#99999999',
            padding: 10,
            borderRadius: 30,
      },
      titleContainer: {
            flexGrow: 1,
            alignContent: 'center',
            justifyContent: 'center',
      },
      startContainer: {
            flexShrink: 1,
            alignContent: 'flex-start',
      },
      endContainer: {
            flexShrink: 1,
            alignContent: 'flex-end',
      },
      inputContainer: {
            borderColor: color.dark.textPrimary,
            borderWidth: 1,
      },
      titleText: {
            textAlign: 'center',
      },
});

export default styles;
