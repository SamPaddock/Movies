import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/movies/homeScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieFavoriteScreen from '../../screens/movies/movieFavoriteScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {

  const tabBarIcon = (name: string, focused: boolean, color: string) => {
    let iconName;
    if (name === 'Home') {
      iconName = focused ? 'home-variant' : 'home-variant-outline';
    } else if (name === 'Favorite') {
      iconName = focused ? 'heart' : 'heart-outline';
    }
    return <Icon name={iconName} size={28} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => tabBarIcon(route.name, focused, color),
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#777777',
        tabBarStyle: { position: 'absolute', borderTopWidth: 0, backgroundColor: '#000000cc'},
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={MovieFavoriteScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
