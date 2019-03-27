import React, {useContext} from 'react';
import {Link} from 'gatsby';
import classNames from 'classnames';
import {stringify as qsStringify} from 'query-string';
import {Icon, Caption} from '@shopify/polaris';
import {QueryParamsContext} from '../../AppFrame';
import {Icon as IconInterface} from '../../../types';
import styles from './SingleIcon.module.scss';

interface Props {
  icon: IconInterface;
  isActive: boolean;
}

export default function SingleIcon({icon, isActive = false}: Props) {
  const className = classNames({
    [styles.IconGridItem]: true,
    [styles.active]: isActive,
  });

  const trackLink = () => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'select_icon', {
        /* eslint-disable-next-line camelcase */
        event_category: 'icons',
        /* eslint-disable-next-line camelcase */
        event_label: icon.metadataId,
      });
    }
  };

  const queryParams = useContext(QueryParamsContext);
  const linkTo = `/?${qsStringify({icon: icon.metadataId, q: queryParams.q})}`;

  return (
    <Link to={linkTo} className={className} onClick={trackLink}>
      <div className={styles.iconSvgWrapper}>
        <Icon source={encodeURIComponent(icon.styles.monotone.svgContent)} />
      </div>
      <div className={styles.iconLabel}>
        <Caption>{icon.name}</Caption>
      </div>
    </Link>
  );
}
