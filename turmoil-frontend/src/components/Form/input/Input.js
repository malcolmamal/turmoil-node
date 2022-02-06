import React from 'react';

import './Input.css';

function Input(props) {
  const {
    label, id, rows, control, valid, touched, type, required, value, placeholder, onChange, onBlur,
  } = props;

  return (
    <div className="input">
      {label && <label htmlFor={id}>{label}</label>}
      {control === 'input' && (
      <input
        className={[
          !valid ? 'invalid' : 'valid',
          touched ? 'touched' : 'untouched',
        ].join(' ')}
        type={type}
        id={id}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(id, e.target.value, e.target.files)}
        onBlur={onBlur}
      />
      )}
      {control === 'textarea' && (
      <textarea
        className={[
          !valid ? 'invalid' : 'valid',
          touched ? 'touched' : 'untouched',
        ].join(' ')}
        id={id}
        rows={rows}
        required={required}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={onBlur}
      />
      )}
    </div>
  );
}

export default Input;
