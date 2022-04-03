import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { responseInterceptor, responseInterceptorEject } from '../../js/core/turmoil-axios';
import useAfterPaintEffect from '../../js/react/hooks/after-paint-effect';

function ResponseInterceptor() {
  const interceptorId = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useAfterPaintEffect(() => {
    interceptorId.current = responseInterceptor(navigate, location);

    return () => {
      responseInterceptorEject(interceptorId.current);
    };
  }, []);

  return null;
}

export default ResponseInterceptor;
