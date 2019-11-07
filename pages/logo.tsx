import React from 'react';

import OffTheShelfLogo from '../components/OffTheShelfLogo';

const LogoPage = () => {
  const [isActive, setIsActive] = React.useState(true);

  const test1 = {
    test2: {
      test3: 'hello',
    },
  };

  const test = test1?.test2?.test3;

  console.log(test);

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
