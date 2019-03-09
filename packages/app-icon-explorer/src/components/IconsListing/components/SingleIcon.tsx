import React from 'react';
import {Link} from 'gatsby';
import classNames from 'classnames';
import {Icon, Caption} from '@shopify/polaris';
import {Icon as IconInterface} from '../../../types';
import styles from './SingleIcon.module.scss';

interface Props {
  icon: IconInterface;
  isActive: boolean;
}

const StyleText = ({iconStyle}: {iconStyle?: string}) =>
  iconStyle === 'twotone' ? (
    <>
      <br /> (twotone)
    </>
  ) : null;

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
        event_label: icon.reactname,
      });
    }
  };

  return (
    <Link
      to={`/?icon=${icon.reactname}`}
      className={className}
      onClick={trackLink}
    >
      <div className={styles.iconSvgWrapper}>
        <Icon
          source={<span dangerouslySetInnerHTML={{__html: icon.svgContent}} />}
        />
      </div>
      <div className={styles.iconLabel}>
        <Caption>
          {icon.name}
          <StyleText iconStyle={icon.style} />
        </Caption>
      </div>
    </Link>
  );
}
