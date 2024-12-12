import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { color } from '../../assets/style/global';

import SplashScreen from '../../screens/general/splashScreen';
import HomeScreen from '../../screens/movies/homeScreen';
import MovieDetailScreen from '../../screens/movies/movieDetailScreen';
import SearchScreen from '../../screens/search/searchScreen';
import MovieFavoriteScreen from '../../screens/movies/movieFavoriteScreen';
import DrawerNavigator from './drawerNavigation';
import { RootStackParamList } from './rootStackParams';
import MovieListScreen from '../../screens/movies/movieListScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationStack = () => {

  const options: NativeStackNavigationOptions = {
    headerShown: false,
    contentStyle: {
      backgroundColor: color.dark.background,
    },
  };

  return (
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={options}
      >
          <Stack.Screen name="Main" component={DrawerNavigator}/>
          <Stack.Screen name="Splash" component={SplashScreen}/>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="MovieFavorite" component={MovieFavoriteScreen}/>
          <Stack.Screen name="MovieList" component={MovieListScreen}/>
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen}/>
          <Stack.Screen name="Search" component={SearchScreen}/>
      </Stack.Navigator>
  );
};

export default NavigationStack;
