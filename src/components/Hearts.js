import React, {useRef, useState} from 'react';
import {Animated, TouchableOpacity} from 'react-native';

import like from '../assets/icon_heart.png';
import no from '../assets/icon_heart_empty.png';

const Hearts = ({bool, size, onChanged}) => {
  const [state, setState] = useState(bool);
  const HeartScale = useRef(new Animated.Value(1)).current;
  const BorderScale = useRef(new Animated.Value(0)).current;
  const BorderOpacity = useRef(new Animated.Value(1)).current;
  const onHeartPressIn = () => {
    Animated.spring(HeartScale, {
      toValue: 0.8,
      useNativeDriver: false,
      speed: 20,
    }).start();
  };

  const onHeartPressOut = () => {
    if (!state) {
      const heart = Animated.spring(HeartScale, {
        toValue: 1,
        useNativeDriver: false,
        speed: 30,
      });
      const border = Animated.spring(BorderScale, {
        toValue: 1.5,
        useNativeDriver: false,
        speed: 30,
      });
      const borderTransparent = Animated.timing(BorderOpacity, {
        toValue: 0,
        useNativeDriver: false,
        duration: 300,
      });
      Animated.parallel([heart, border, borderTransparent]).start(() => {
        HeartScale.setValue(1);
        BorderScale.setValue(0);
        BorderOpacity.setValue(1);
      });
      setState(!state);
      onChanged(!bool);
    } else {
      Animated.spring(HeartScale, {
        toValue: 1,
        useNativeDriver: false,
        speed: 30,
      }).start();
      setState(!state);
    }
  };

  return (
    <TouchableOpacity onPressIn={onHeartPressIn} onPressOut={onHeartPressOut}>
      <Animated.Image
        source={state ? like : no}
        style={{
          height: size,
          width: size,
          transform: [
            {
              scale: HeartScale,
            },
          ],
          resizeMode: 'contain',
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
          opacity: BorderOpacity,
        }}
      />
    </TouchableOpacity>
  );
};

export default Hearts;
