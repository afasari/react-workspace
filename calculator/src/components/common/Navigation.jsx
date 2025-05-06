import React from 'react';

const Navigation = ({ onSelectCalculator }) => {
  return (
    <nav className="calculator-nav">
      <h3>Choose Calculator Type:</h3>
      <ul>
        <li>
          <button onClick={() => onSelectCalculator('rbb-bumn')}>
            RBB BUMN 2025
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;