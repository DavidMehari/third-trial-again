import React from 'react';
import InputCheckBoxSingle from './InputCheckBoxSingle';


function Filters({setRestaurantFilter}) {
   

 
  function handleSingleCheckboxChange({target:{checked}}) {
    console.log(checked);
    setRestaurantFilter(checked);
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
          
        </div>
      </form>
    </div>
  );
}

export default Filters;