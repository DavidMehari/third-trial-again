import React from 'react';

function InputCheckBoxSingle({
  label,
  name,
  handleOnChange,
  wasValidated = false,
  errorMessages = [],
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
    <>
      <div className="mb-3">
        <div className="form-check">
          <input
            className={'form-check-input ' + getValidClassName()}
            type="checkbox"
            id={name}
            name={name}
            value={name}
            onChange={handleOnChange}
          />
          <label className="form-check-label" htmlFor={name}>
            {label}
          </label>
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
      </div>
    </>
  );
}

export default InputCheckBoxSingle;
