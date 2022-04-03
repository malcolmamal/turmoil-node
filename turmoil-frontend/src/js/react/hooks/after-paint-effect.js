import { useEffect } from 'react';

const useAfterPaintEffect = (effect, dependencies) => {
  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        effect();
      }, 0);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useAfterPaintEffect;
