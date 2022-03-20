import { useEffect, useRef } from 'react';
import {useLocation, useNavigate} from 'react-router';
import Layout from '../../js/core/turmoil-layout';
import { responseInterceptor, responseInterceptorEject } from '../../js/core/turmoil-axios';

function ResponseInterceptor() {
  const interceptorId = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    interceptorId.current = responseInterceptor(navigate, location);

    return () => {
      responseInterceptorEject(interceptorId.current);
    };
  }, []);

  return null;
}

export default ResponseInterceptor;
