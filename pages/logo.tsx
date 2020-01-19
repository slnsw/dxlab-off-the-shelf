import React from 'react';

import OffTheShelfLogo from '../components/OffTheShelfLogo';
import OffTheShelfLogoDivBorders from '../components/OffTheShelfLogoDivBorders';

const LogoPage = () => {
  const [isActive, setIsActive] = React.useState(true);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: '10rem',
        height: '100vh',
      }}
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      <OffTheShelfLogo isActive={isActive} />
      <OffTheShelfLogoDivBorders orientation="topRight"></OffTheShelfLogoDivBorders>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default LogoPage;
