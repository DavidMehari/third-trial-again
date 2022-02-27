import React from 'react';

function InputField({
  label,
  name,
  type,
  handleOnChange,
  wasValidated = false,
  errorMessages = [],
  value = ''
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
    <div className='mb-3'>
      <label htmlFor={name} className='form-label'>
        {label}
      </label>
      <input
        onChange={handleOnChange}
        name={name}
        type={type}
        className={'form-control ' + getValidClassName()}
        id={name}
        value={value}
      />
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

export default InputField;
