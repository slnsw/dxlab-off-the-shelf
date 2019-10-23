import React from 'react';

import OffTheShelfLogo from '../components/OffTheShelfLogo';

const LogoPage = () => {
  const [isHidden, setIsHidden] = React.useState(false);

  return (
    <div
      onClick={() => {
        setIsHidden(!isHidden);
      }}
      style={{
        padding: '10rem',
        height: '100vh',
      }}
    >
      <OffTheShelfLogo isHidden={isHidden} />
    </div>
  );
};

export default LogoPage;
