import React from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import Turmoil from './Turmoil';

function WrappedTurmoil() {
  const navigate = useNavigate();
  const location = useLocation();

  return <Turmoil navigate={navigate} location={location} />;
}

export default WrappedTurmoil;
