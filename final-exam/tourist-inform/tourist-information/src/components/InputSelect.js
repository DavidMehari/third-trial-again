import React from 'react';

function InputSelect({
  label,
  name,
  handleOnChange,
  wasValidated = false,
  errorMessages = [],
  children
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
    <div className="col-md-12 mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        defaultValue={'choose'}
        className={'form-select ' + getValidClassName()}
        id={name} 
        name={name} 
        onChange={handleOnChange}       
      >
        {/* <option disabled value="choose">
          Válassz...
        </option> */}
        {children}
      </select>
      <div className={'invalid-feedback'}>
        {errorMessages.length === 1 
          ? errorMessages[0] 
          : <ul>{errorMessages.map((errorMessage, i) => (
                <li key={i}>{errorMessage}</li>
              ))}
            </ul>
        }
      </div>
    </div>
  );
}

export default InputSelect;
