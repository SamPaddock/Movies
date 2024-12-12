import React, { useMemo } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { color } from '../../assets/style/global';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, setTheme } from '../redux/appSlice';

interface CellProps {
      text: string;
      value: boolean;
      onChange: () => void;
}

const SideDrawer: React.FC<DrawerContentComponentProps> = ({}) => {
      const { theme, language } = useSelector((state: RootState) => state.preferences);
      const dispatch = useDispatch();

      const backgroundStyle = useMemo(() => ({
            backgroundColor: color[theme].background,
      }), [theme]);

      const headerStyle = useMemo(() => ({
            backgroundColor: color[theme].primary,
      }), [theme]);

      const textStyle = useMemo(() => ({
            color: color[theme].textPrimary,
      }), [theme]);

      const changeTheme = () => {
            dispatch(setTheme(theme));
      };

      const changeLanguage = () => {
            dispatch(setLanguage(language));
      };

      const Cell = useMemo(() => {
            return ({ text, value, onChange }: CellProps) => (
                  <View style={[styles.drawerItem]}>
                        <Text style={[styles.drawerItemText, {color: color[theme].textPrimary}]}>{text}</Text>
                        <Switch value={value} onChange={onChange}/>
                  </View>
            );
      }, [theme]);

      return (
            <View style={[styles.container, backgroundStyle]}>
                  <View style={[styles.headerContainer, headerStyle]}>
                        <Text style={[styles.drawerHeader, textStyle]}>Preference</Text>
                  </View>
                  <Cell value={theme === 'dark'} text={"DarkMode"} onChange={() => changeTheme()}/>
                  <Cell value={language === 'en'} text={"Language"} onChange={() => changeLanguage()}/>
            </View>
      );
};

const styles = StyleSheet.create({
      container: {
            flex: 1,
      },
      headerContainer: {
            width: '100%',
            paddingTop: 80,
            paddingHorizontal: 20,
      },
      drawerHeader: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 20,
      },
      drawerItem: {
            flexDirection: 'row',
            paddingVertical: 12,
            paddingHorizontal: 20,
            width: '100%',
            justifyContent: 'space-between',
      },
      drawerItemText: {
            fontSize: 16,
            alignSelf: 'center',
      },
});

export default SideDrawer;
