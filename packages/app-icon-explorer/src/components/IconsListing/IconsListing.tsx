import React from 'react';
import {Heading} from '@shopify/polaris';
import SingleIcon from './components/SingleIcon';
import styles from './IconsListing.module.scss';

export default function IconsListing(props) {
  if (!props.icons.length) {
    return null;
  }

  const iconsMarkup = props.icons.map((icon) => (
    <SingleIcon
      key={icon.id}
      icon={icon}
      isActive={props.activeIconId === icon.id}
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
