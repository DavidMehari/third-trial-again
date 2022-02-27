import React from 'react';
import { useState } from 'react';
import Alert from './components/Alert';
import InputField from './components/InputField';
import InputSelectWithOptions from './components/InputSelectWithOptions';
import InputTextarea from './components/InputTextarea';
import { addNewDocument } from './firebase/firebaseFunctions';

function NewAttraction() {
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState({
    name: [],
    settlement: [],
    address: [],
    category: [],
    price: [],
    note: [],
  });
  const [wasValidated, setWasValidated] = useState(false);
  const [formSent, setFormSent] = useState(false);

  function resetErrorMessages() {
    setErrorMessages({
      name: [],
      settlement: [],
      address: [],
      category: [],
      price: [],
      note: [],
    });
  }

  const validators = {
    name: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
    ],
    settlement: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
    ],
    address: [
      {
        fn: isNotEmpty,
        errorMessage: 'Nem lehet üres',
      },
    ],
    category: [
      {
        fn: isOptionSelected,
        errorMessage: 'Nem lehet üres',
      },
    ],
    price: [
      {
        fn: isNotNegative,
        errorMessage: 'Nem lehet negatív',
      },
    ],
    note: [
      {
        fn: isNotLongerThan1000,
        errorMessage: 'Nem lehet több, mint 1000 karakter',
      },
    ],
  };

  function reportFieldValidityMulti(inputName) {
    let validationReports = [];

    validators[inputName].forEach((validator) => {
      const validatorFn = validator.fn;

      let isValid = validatorFn(formData[inputName]);

      const validatorErrorMessage = validator.errorMessage;

      setErrorMessages((prev) => ({
        ...prev,
        [inputName]: !isValid
          ? [...prev[inputName], validatorErrorMessage]
          : prev[inputName].filter(
              (element) => element !== validatorErrorMessage
            ),
      }));
      validationReports.push(isValid);
    });

    return validationReports.every((inputValidation) => inputValidation);
  }

  function isNotEmpty(name = '') {
    console.log('nameTocheck - ', name);
    return name !== '';
  }

  function isOptionSelected(selected = '') {
    console.log('isOptionSelected - ', selected);
    return selected !== '' && selected !== 'choose';
  }

  function isNotNegative(age) {
    console.log('isNotNegative - ', age);
    return age >= 0;
  }

  function isNotLongerThan1000(note = '') {
    console.log('noteTocheck - ', note);
    return note.length < 1000;
  }
  
  function reportFormValidity() {
    resetErrorMessages();
    const inputFieldNames = Object.keys(validators);
    const inputValidations = inputFieldNames.map((inputFieldName) =>
      reportFieldValidityMulti(inputFieldName)
    );
    let isValid = inputValidations.every((inputValidation) => inputValidation);
    setWasValidated(true);
    return isValid;
  }

  function handleOnChange({ target: { name, value } }) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }


  function handleOnSubmit(event) {
    event.preventDefault();
    setFormSent(false);
    let formIsValid = reportFormValidity();

    if (formIsValid) {
      addNewDocument('attractions', formData)
      .then((result) => {
        if(result === 'ok') {
          setFormData({});
          setWasValidated(false);
          setFormSent(true);
        }
      });

    }
  }

  return (
    <div className="container">
      <h1>Regisztráció</h1>
      <form onSubmit={handleOnSubmit} noValidate={true} className="mb-3">

        <InputField
          label="Név"
          handleOnChange={handleOnChange}
          name="name"
          type="text"
          wasValidated={wasValidated}
          value={formData.name}
          errorMessages={errorMessages.name}
        />

        <InputField
          label="Település"
          handleOnChange={handleOnChange}
          name="settlement"
          type="text"
          wasValidated={wasValidated}
          value={formData.settlement}
          errorMessages={errorMessages.settlement}
        />
        
        <InputField
          label="Cím (utca, házszám)"
          handleOnChange={handleOnChange}
          name="address"
          type="text"
          wasValidated={wasValidated}
          value={formData.address}
          errorMessages={errorMessages.address}
        />

        <InputSelectWithOptions
          label="Kategória"
          name="category"
          handleOnChange={handleOnChange}
          wasValidated={wasValidated}
          errorMessages={errorMessages.category}
          data={[ "múzeum", "étterem", "építmény"]}
        />
        
        <InputField
          label="Ár"
          handleOnChange={handleOnChange}
          name="price"
          type="number"
          wasValidated={wasValidated}
          value={formData.price}
          errorMessages={errorMessages.price}
        />

        <InputTextarea
          label="Megjegyzés"
          name="note"
          handleOnChange={handleOnChange}
          wasValidated={wasValidated}
          errorMessages={errorMessages.note}
          value={formData.note}
        />

        <button className="btn btn-primary">Mentés</button>
      </form>

      { formSent &&
        <Alert theme={"success"}>
          Sikeres mentés
        </Alert>
      }
    </div>
  );
}

export default NewAttraction;
