import * as React from 'react';

import Link from 'next/link';
import OffTheShelfLogoText from '../OffTheShelfLogoText';
import CTAButton from '../CTAButton';

import css from './Header.scss';

type Props = {
  basePathnameHref?: string;
  basePathnameAs?: string;
  className?: string;
};

const Header: React.FunctionComponent<Props> = ({
  basePathnameHref,
  basePathnameAs,
  className,
}) => {
  return (
    <div className={[css.header, className || ''].join(' ')}>
      <OffTheShelfLogoText
        isActive={true}
        className={css.logo}
      ></OffTheShelfLogoText>

      <div className={css.borders}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <Link href={`${basePathnameHref}/[page]`} as={`${basePathnameAs}/about`}>
        <CTAButton className={css.link} size="sm">
          About
        </CTAButton>
        {/* <a className={css.link}>About</a> */}
      </Link>
    </div>
  );
};

export default Header;
