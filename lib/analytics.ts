import TagManager from 'react-gtm-module';

export const initGA = () => {
  if (typeof process.env.GTM_ID !== 'undefined') {
    const tagManagerArgs = {
      gtmId: process.env.GTM_ID,
    };

    TagManager.initialize(tagManagerArgs);
  }
};
