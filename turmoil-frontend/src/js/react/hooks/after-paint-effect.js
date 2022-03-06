import { useEffect } from 'react';

const useAfterPaintEffect = (effect, dependencies) => {
  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        effect();
      }, 0);
    });
  }, dependencies);
};

export default useAfterPaintEffect;
