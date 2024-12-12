import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Label from '../../atoms/label';
import styles from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../../helper/redux/store';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../helper/navigation/rootStackParams';
import { color } from '../../../assets/style/global';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextField from '../../atoms/textfield';
import { iconName } from '../../../constant/assetsType';

interface HeaderProps {
      text?: string;
      transparent?: boolean;
      showMenuButton?: boolean;
      showBackButton?: boolean;
      showSearchBar?: boolean;
      onBackPress?: () => void;
      onSearchChange?: (text: string) => void;
      leftIcon?: iconName,
      onLeftIconPress?: () => void;
}

const Header = (props: HeaderProps) => {
      const { isRTL, theme } = useSelector((state: RootState) => state.preferences);
      const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, ''>>();
      const {
            text,
            transparent = false,
            showBackButton = false,
            onBackPress,
            showMenuButton = false,
            showSearchBar = false,
            onSearchChange,
            leftIcon,
            onLeftIconPress,
      } = props;

      const onIconPress = () => {if(onBackPress) { onBackPress(); }};

      return (
            <View style={[styles.container, transparent && styles.transparentStyle]}>
                  <View style={[styles.startContainer, transparent && styles.transparentIconContainer]}>
                        {
                              showBackButton
                              ? <Icon name={ isRTL ? 'arrow-right' : 'arrow-left'} size={24} onPress={onIconPress} color={transparent ? color.default.white : color[theme].icon}/>
                              : showMenuButton
                              ? <Icon name={'menu'} size={24} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} color={transparent ? color.default.white : color[theme].icon}/>
                              : <></>
                        }
                  </View>
                  {
                        showSearchBar
                        ?
                              <TextField
                                    iconName='magnify'
                                    onChangeText={onSearchChange}
                                    inputContainer={styles.inputContainer}
                                    iconColor={color[theme].icon}
                                    placeholder='Search'
                                    placeholderTextColor={color.default.lightGray}
                                    textStyle={{color: color.default.white}}
                              />
                        :
                              <>
                                    {
                                          text &&
                                          <View style={styles.titleContainer}>
                                                <Label style={styles.titleText} text={text} type="title"/>
                                          </View>
                                    }
                                    <View style={[styles.endContainer, (transparent && (leftIcon)) && styles.transparentIconContainer]}>
                                          { leftIcon && <Icon name={leftIcon} size={24} onPress={onLeftIconPress} color={transparent && color.default.white}/> }
                                    </View>
                              </>
                  }
            </View>
      );
};

export default Header;
