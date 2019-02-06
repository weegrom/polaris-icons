import React from 'react';
import {Link} from 'gatsby';
import {Icon, Caption} from '@shopify/polaris';

import styles from './SingleIcon.module.scss';

// eslint-disable-next-line jsx-a11y/click-events-have-key-events
export default function SingleIcon({icon}) {
  return (
    <Link to={`/?icon=${icon.name}`} className={styles.IconGridItem}>
      <Icon source={<div dangerouslySetInnerHTML={{__html: icon.svg}} />} />
      <div className={styles.iconLabel}>
        <Caption>{icon.name}</Caption>
      </div>
    </Link>
  );
}
