import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../helper/navigation/rootStackParams';
import LottieView from 'lottie-react-native';
const SplashAnimation = require('../../assets/animation/splash_animation.json');

const SplashScreen = () => {
      const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

      const navigateTo = () => {
            navigation.navigate('Main');
      };

      return (
            <LottieView
                  source={SplashAnimation}
                  onAnimationFinish={() => navigateTo()}
                  autoPlay
                  loop={false}
                  style={{flex: 1, backgroundColor: 'black'}}
            />
      );
};

export default SplashScreen;
