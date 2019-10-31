import React from 'react';

import Loader from '../components/Loader';

const LoaderPage = () => {
  const [isActive, setIsActive] = React.useState(true);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      onClick={() => {
        setIsActive(!isActive);
      }}
    >
      <Loader isActive={isActive} strokeWidth={4} delay={0} />
    </div>
  );
};

export default LoaderPage;
