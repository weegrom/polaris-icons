import React from 'react';
import {Link} from 'gatsby';
import classNames from 'classnames';
import {Icon, Caption} from '@shopify/polaris';

import styles from './SingleIcon.module.scss';

// eslint-disable-next-line jsx-a11y/click-events-have-key-events
export default function SingleIcon({icon, isActive = false}) {
  const className = classNames({
    [styles.IconGridItem]: true,
    [styles.active]: isActive,
  });

  /* eslint-disable react/jsx-no-bind */
  return (
    <Link
      to={`/?icon=${icon.reactname}`}
      className={className}
      onClick={() => {
        if ((window as any).gtag) {
          (window as any).gtag('event', 'select_icon', {
            /* eslint-disable-next-line camelcase */
            event_category: 'icons',
            /* eslint-disable-next-line camelcase */
            event_label: icon.reactname,
          });
        }
      }}
    >
      <Icon
        source={
          <div
            className={styles.iconSvg}
            dangerouslySetInnerHTML={{__html: icon.svgContent}}
          />
        }
      />
      <div className={styles.iconLabel}>
        <Caption>{icon.name}</Caption>
      </div>
    </Link>
  );
}
