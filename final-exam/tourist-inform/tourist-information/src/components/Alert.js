import React from 'react';

function Alert({theme, children}) {
  return (
    <div className={`alert alert-${theme}`} role="alert">
      {children}
    </div>
  );
}

export default Alert;
