import React from 'react';
import {Heading} from '@shopify/polaris';
import {Icon as IconInterface} from '../../types';
import SingleIcon from './components/SingleIcon';
import styles from './IconsListing.module.scss';

interface Props {
  icons: IconInterface[];
  heading: string;
  showCount: boolean;
  activeIconId?: string;
}

export default function IconsListing(props: Props) {
  if (!props.icons.length) {
    return null;
  }

  const iconsMarkup = props.icons.map((icon: IconInterface) => (
    <SingleIcon
      key={icon.metadataId}
      icon={icon}
      isActive={props.activeIconId === icon.metadataId}
    />
  ));

  const headingMarkup =
    props.heading + (props.showCount ? ` (${props.icons.length})` : '');

  return (
    <div>
      <div className={styles.iconHeading}>
        <Heading>{headingMarkup}</Heading>
      </div>
      <div className={styles.IconGrid}>{iconsMarkup}</div>
    </div>
  );
}
