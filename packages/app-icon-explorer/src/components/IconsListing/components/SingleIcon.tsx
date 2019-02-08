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

  return (
    <Link to={`/?icon=${icon.name}`} className={className}>
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
