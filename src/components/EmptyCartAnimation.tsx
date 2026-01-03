import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../public/assets/animations/cart-empty-animation.json';

const EmptyCartAnimation: React.FC = () => {
  return (
    <Lottie
      animationData={animationData}
      loop
      //autoplay={false}
      style={{ width: 120, height: 120 }}
    />
  );
};

export default EmptyCartAnimation;
