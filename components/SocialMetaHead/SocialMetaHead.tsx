import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  // baseUrl?: string;
  siteName?: string;
  fbAppId?: string;
  twitterUsername?: string;
};

/**
 * Social meta tags for Next JS's Head component
 * To use, place adjacent to (not inside) other Head components
 * https://css-tricks.com/essential-meta-tags-social-media/#article-header-id-2
 */
const SocialMetaHead: React.FunctionComponent<Props> = ({
  title,
  description,
  imageUrl,
  imageAlt,
  // baseUrl,
  siteName,
  fbAppId,
  twitterUsername,
}) => {
  const router = useRouter();
  const url = router.asPath;

  return (
    <Head>
      {/* ----------------------------------------------------------------- */}
      {/* Essential Meta Tags */}
      {/* ----------------------------------------------------------------- */}

      {title && (
        <meta property="og:title" content={title} key="meta-og:title" />
      )}

      {description && (
        <meta
          property="og:description"
          content={description}
          key="meta-og:description"
        />
      )}

      {url && <meta property="og:url" content={url} key="meta-og:url" />}

      {imageUrl && (
        <meta property="og:image" content={imageUrl} key="meta-og:image" />
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Non-Essential, But Recommended */}
      {/* ----------------------------------------------------------------- */}

      {siteName && (
        <meta
          property="og:site_name"
          content={siteName}
          key="meta-og:site_name"
        />
      )}

      {imageAlt && (
        <meta
          name="twitter:image:alt"
          content={imageAlt}
          key="meta-twitter:image:alt"
        />
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Non-Essential, But Required for analytics */}
      {/* ----------------------------------------------------------------- */}

      {fbAppId && (
        <meta property="fb:app_id" content={fbAppId} key="meta-fb:app_id" />
      )}

      {twitterUsername && (
        <meta
          name="twitter:site"
          content={twitterUsername}
          key={'meta-twitter:site'}
        />
      )}
    </Head>
  );
};

export default SocialMetaHead;
