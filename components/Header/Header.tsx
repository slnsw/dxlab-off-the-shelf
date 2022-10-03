import * as React from 'react';

import Link from 'next/link';
import OffTheShelfLogoText from '../OffTheShelfLogoText';
import CTAButton from '../CTAButton';

import css from './Header.module.scss';

type Props = {
  basePathnameHref?: string;
  basePathnameAs?: string;
  isRandomButtonDisabled?: boolean;
  onRandomClick: Function;
  className?: string;
};

const Header: React.FunctionComponent<Props> = ({
  basePathnameHref,
  basePathnameAs,
  isRandomButtonDisabled = false,
  onRandomClick,
  className,
}) => {
  return (
    <div className={[css.header, className || ''].join(' ')}>
      <div className={css.borders}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <OffTheShelfLogoText
        isActive={true}
        className={css.logo}
      ></OffTheShelfLogoText>

      {/* <div className={css.borders}>
        <div></div>
        <div></div>
        <div></div>
      </div> */}

      <>
        <CTAButton
          className={[
            css.link,
            css.randomButton,
            isRandomButtonDisabled ? css.randomButtonDisabled : '',
          ].join(' ')}
          size="sm"
          disabled={isRandomButtonDisabled}
          onClick={onRandomClick}
        >
          Randomise
        </CTAButton>

        <Link
          href={`${basePathnameHref}/[page]`}
          as={`${basePathnameAs}/about`}
        >
          <CTAButton className={css.link} size="sm">
            About
          </CTAButton>
          {/* <a className={css.link}>About</a> */}
        </Link>
      </>
    </div>
  );
};

export default Header;
