import React from 'react';

function InputTextarea({
  label,
  name,
  handleOnChange,
  wasValidated = false,
  errorMessages = [],
  value = '',
}) {
  function getValidClassName() {
    let className = '';
    let isValid = errorMessages.length === 0;
    if (wasValidated) {
      if (isValid) {
        className = 'is-valid';
      } else {
        className = 'is-invalid';
      }
    }
    return className;
  }

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={handleOnChange}
        rows={2}
        className={'form-control ' + getValidClassName()}
      />
      <div className={'invalid-feedback'}>
        {errorMessages.length === 1 ? (
          errorMessages[0]
        ) : (
          <ul>
            {errorMessages.map((errorMessage, i) => (
              <li key={i}>{errorMessage}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default InputTextarea;
