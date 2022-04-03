import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

function Button(props) {
  const {
    link, design, mode, onClick, disabled, loading, children, className,
  } = props;

  return !link ? (
    <div className={className}>
      <button
        className={[
          'button',
          `button--${design}`,
          `button--${mode}`,
        ].join(' ')}
        onClick={onClick}
        disabled={disabled || loading}
        type="submit"
      >
        {loading ? 'Loading...' : children}
      </button>
    </div>
  ) : (
    <div className={className}>
      <Link
        className={[
          'button',
          `button--${design}`,
          `button--${mode}`,
        ].join(' ')}
        to={link}
      >
        {children}
      </Link>
    </div>
  );
}

export default Button;
