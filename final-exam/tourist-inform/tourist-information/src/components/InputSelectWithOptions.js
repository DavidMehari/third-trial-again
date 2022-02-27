import React from 'react';

function InputSelectWithOptions({
  label,
  name,
  handleOnChange,
  wasValidated = false,
  errorMessages = [],
  data
}) {
  //data ['opt1', 'opt2', 'opt3']
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
        defaultValue="choose"
        className={'form-select ' + getValidClassName()}
        id={name} 
        name={name} 
        onChange={handleOnChange}       
      >
        <option disabled value="choose">
          Válassz...
        </option>
        {data.map(dataElement => (
          <option key={dataElement} value={dataElement}>{dataElement}</option>
        ))}
        
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

export default InputSelectWithOptions;
