import * as React from 'react';
import { useRouter } from 'next/router';

import OffTheShelfLogoDivBorders from '../OffTheShelfLogoDivBorders';

import css from './ShareBox.scss';

type Props = {
  title: string;
  text: string;
  // pathname?: string;
  imageUrl?: string;
  baseUrl: string;
  fbAppId: string;
  className?: string;
};

const ShareBox: React.FunctionComponent<Props> = ({
  title,
  text,
  // pathname,
  imageUrl,
  baseUrl,
  fbAppId,
  className,
}) => {
  const router = useRouter();
  const pathname = router.asPath;

  const tweetText = encodeURIComponent(`${title} #dxlab @statelibrarynsw`);

  const url = encodeURIComponent(`${baseUrl}${pathname}`);

  const fbLink = `https://www.facebook.com/dialog/share?app_id=${fbAppId}&href=${url}&redirect_uri=${url}&name=%${encodeURIComponent(
    title,
  )}&description=${encodeURIComponent(text)}${
    imageUrl ? `&picture=${imageUrl}` : ''
  }`;

  const twitterLink = `https://twitter.com/intent/tweet?text=${tweetText}&url=${url}`;

  return (
    <div className={[css.shareBox, className || ''].join(' ')}>
      <OffTheShelfLogoDivBorders
        isActive={true}
        strokeWidth={2}
        notchLength={6}
        className={css.borders}
      ></OffTheShelfLogoDivBorders>

      <h2 className={css.title}>Share</h2>

      <div className={css.icons}>
        <a
          href={fbLink}
          aria-label="Share this item on Facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className={[css.icon, 'ion-logo-facebook'].join(' ')}
            aria-hidden="true"
          />
        </a>

        <a
          href={twitterLink}
          aria-label="Share this item on Twitter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className={[css.icon, 'ion-logo-twitter'].join(' ')}
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );
};

export default ShareBox;
