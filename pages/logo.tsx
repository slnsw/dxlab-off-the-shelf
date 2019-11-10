import React from 'react';

import OffTheShelfLogo from '../components/OffTheShelfLogo';

const LogoPage = () => {
  const [isActive, setIsActive] = React.useState(true);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10rem',
        height: '100vh',
      }}
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      <div>
        <OffTheShelfLogo isActive={isActive} />

        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default LogoPage;
