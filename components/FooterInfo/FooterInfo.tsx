import * as React from 'react';

import css from './FooterInfo.scss';

type Props = {
  className?: string;
};

const FooterInfo: React.FunctionComponent<Props> = ({ className }) => {
  return (
    <div className={[css.footerInfo, className || ''].join(' ')}>
      <div className={css.logoHolder}>
        <a href="https://dxlab.sl.nsw.gov.au">
          <img
            // className="info-box__logo info-box__logo--dxlab"
            className={[css.logo, css.logoDxlab].join(' ')}
            src="/off-the-shelf/images/logos/logo-dxlab.png"
            alt="DX Lab Home"
          />
        </a>
        <a href="http://sl.nsw.gov.au">
          <img
            // className="info-box__logo info-box__logo--slnsw"
            className={[css.logo, css.logoSlnsw].join(' ')}
            src="/off-the-shelf/images/logos/logo-slnsw-white.png"
            alt="State Library of NSW Home"
          />
        </a>
      </div>

      <div>
        <ul className={css.menu}>
          {footerItems.map((item, i) => (
            <li key={item.name}>
              <a href={item.url}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const footerItems = [
  { name: 'Disclaimer', url: 'https://www.sl.nsw.gov.au/disclaimer' },
  {
    name: 'Privacy',
    url: 'https://www.sl.nsw.gov.au/privacy/web-privacy-statement',
  },
  { name: 'Copyright', url: 'https://www.sl.nsw.gov.au/copyright' },
  {
    name: 'Right to information',
    url: 'https://www.sl.nsw.gov.au/right-to-information',
  },
];

export default FooterInfo;
