import React from 'react';

import OffTheShelfLogo from '../components/OffTheShelfLogo';

const LogoPage = () => {
  const [isActive, setIsActive] = React.useState(true);

  return (
    <div
      style={{
        padding: '10rem',
        height: '100vh',
      }}
    >
      <OffTheShelfLogo isActive={isActive} />

      <br />
      <br />
      <br />
      <br />

      <button
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        Show/Hide
      </button>
    </div>
  );
};

export default LogoPage;
