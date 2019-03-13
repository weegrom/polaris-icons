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

  const queryParams = useContext(QueryParamsContext);
  const linkTo = `/?${qsStringify({icon: icon.reactname, q: queryParams.q})}`;

  return (
    <Link to={linkTo} className={className}>
      <div className={styles.iconSvgWrapper}>
        <Icon source={encodeURIComponent(icon.svgContent)} />
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
