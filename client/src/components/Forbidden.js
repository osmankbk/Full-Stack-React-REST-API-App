import React from 'react';
//This component runs when access is denied
const Forbidden = () => {
    return(
        <div>
        <div className="bounds">
          <h1>Forbidden</h1>
          <p>Oh oh! You can't access this page.</p>
        </div>
      </div>
    );
}

export default Forbidden;