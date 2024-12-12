import { Dimensions, StyleSheet } from 'react-native';
import { color } from '../../../assets/style/global';
import { themes } from '../../../constant/assetsType';

const styles = (theme: themes) => StyleSheet.create({
      container: {
            width: Dimensions.get('screen').width,
            flexDirection: 'row',
            paddingTop: 60,
            paddingBottom: 12,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            backgroundColor: color[theme].primary,
      },
      cellCard: {
            width: Dimensions.get('screen').width / 2 - 20 - 12,
      },
      cellImageCard: {
            width: '100%',
            aspectRatio: 2 / 3,
            borderRadius: 4,
            borderColor: color.default.dimGray,
            borderWidth: 0.5,
      },
      likeIconContainer: {
            position: 'absolute',
            start: 8,
            top: 8,
            backgroundColor: color.default.black50,
            padding: 6,
            borderRadius: 24,
      },
      shareIconContainer: {
            position: 'absolute',
            end: 8,
            top: 8,
            backgroundColor: color.default.black50,
            padding: 6,
            borderRadius: 24,
      },
      infoContainer: {
            position: 'absolute',
            start: 0,
            end: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: color.default.black80,
            padding: 4,
      },
});

export default styles;
