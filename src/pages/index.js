import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <Link to='/heroes'>
        <h2>Go to Heroes Table</h2>
      </Link>
    </div>
  );
};

export default LandingPage;
