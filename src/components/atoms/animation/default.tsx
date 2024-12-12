import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';

const Animation = (props: {path: string | {uri: string}, onEnd?: () => void}) => {
  const animationRef = useRef<LottieView>(null);

  const onAnimationFinish = () => {
      if(props?.onEnd) {props.onEnd()}
  };

  return (
      <LottieView
            ref={animationRef}
            source={{uri: 'https://app.lottiefiles.com/animation/570f2bff-6858-4efb-a83d-21eeac3e69a9'}}
            onAnimationFinish={() => onAnimationFinish()}
            autoPlay
            style={{flex: 1, backgroundColor: 'black'}}
            enableMergePathsAndroidForKitKatAndAbove={true}
      />
  );
}

export default Animation;
