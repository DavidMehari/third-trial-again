import React from 'react';
import InputCheckBoxSingle from './InputCheckBoxSingle';
import InputSelect from './InputSelect';

function Filters({setSettlementFilter, setRestaurantFilter, cities}) {
   

 
  function handleSingleCheckboxChange({target:{checked}}) {
    console.log(checked);
    setRestaurantFilter(checked);
  }

  function handleCategChange({target:{value}}) {
    console.log(value);
    setSettlementFilter(value);
  }

  return (
    <div className="filters">
      <form className="row g-2 needs-validation" noValidate onSubmit={(e) => e.preventDefault()}>
  
        <div className="col-12 d-flex justify-content-between">
          
          <InputCheckBoxSingle
            label="Csak éttermek"
            name="restaurants"
            handleOnChange={handleSingleCheckboxChange}
          />

          <InputSelect
            label="Kategória"
            name="category"
            handleOnChange={handleCategChange}
          >
            <option /*disabled*/ value="">
              Válassz...
          </option>
            {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
          </InputSelect>
          
        </div>
      </form>
    </div>
  );
}

export default Filters;