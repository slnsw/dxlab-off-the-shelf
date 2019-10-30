import React from 'react';

import Loader from '../components/Loader';

const LoaderPage = () => {
  // const [isActive, setIsActive] = React.useState(true);

  return (
    <div style={{ margin: '3em;' }}>
      <Loader isActive={true} strokeWidth={8} delay={0} />
    </div>
  );
};

export default LoaderPage;
