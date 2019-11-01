import TagManager from 'react-gtm-module';

export const initGA = () => {
  if (typeof process.env.OFF_THE_SHELF_GTM_ID !== 'undefined') {
    const tagManagerArgs = {
      gtmId: process.env.OFF_THE_SHELF_GTM_ID,
    };

    console.log(
      'Initialise Google Tag Manager -',
      process.env.OFF_THE_SHELF_GTM_ID,
    );

    TagManager.initialize(tagManagerArgs);
  }
};
