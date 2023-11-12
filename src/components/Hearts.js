import React, {useRef} from 'react';
import {Animated, TouchableOpacity} from 'react-native';

import like from '../assets/icon_heart.png';
import no from '../assets/icon_heart_empty.png';

const Hearts = ({bool, size}) => {
  const HeartScale = useRef(new Animated.Value(1)).current;
  const BorderScale = useRef(new Animated.Value(0.7)).current;

  const onHeartPressIn = () => {
    Animated.spring(HeartScale, {
      toValue: 0.8,
      useNativeDriver: false,
      speed: 20,
    }).start();
  };

  const onHeartPressOut = () => {
    Animated.spring(HeartScale, {
      toValue: 1,
      useNativeDriver: false,
      speed: 30,
    }).start();
  };

  return (
    <TouchableOpacity onPressIn={onHeartPressIn} onPressOut={onHeartPressOut}>
      <Animated.Image
        source={bool ? like : no}
        style={{
          height: size,
          width: size,
          transform: [
            {
              scale: HeartScale,
            },
          ],
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          borderColor: '#ff2442',
          borderWidth: size / 15,
          width: size,
          height: size,
          borderRadius: size / 2,
          transform: [
            {
              scale: BorderScale,
            },
          ],
        }}
      />
    </TouchableOpacity>
  );
};

export default Hearts;
