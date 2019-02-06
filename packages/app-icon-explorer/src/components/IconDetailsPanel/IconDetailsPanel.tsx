import React from 'react';
import {
  Icon,
  TextContainer,
  Heading,
  Subheading,
  Button,
  Stack,
} from '@shopify/polaris';
import {camelCase, startCase} from 'lodash';
import {Icon as IconInterface} from '../../types';
import styles from './IconDetailsPanel.module.scss';

interface Props {
  icon?: IconInterface;
}

export default function IconPanel({icon}: Props) {
  if (!icon) {
    return <EmptyState />;
  }

  const status = icon.public ? 'Available' : 'Unavailable';

  return (
    <div className={styles.iconDetailsPanel}>
      <TextContainer>
        <div className={styles.icon}>
          <Icon source={<div dangerouslySetInnerHTML={{__html: icon.svg}} />} />
        </div>
        <div className={styles.spacingBase}>
          <div className={styles.iconInfo}>
            <Heading>{startCase(icon.name)}</Heading>
            <p>{startCase(icon.set)} icon - 20px</p>
          </div>
          <div dangerouslySetInnerHTML={{__html: icon.descriptionHtml}} />
        </div>
        <div>
          <Subheading>Created by</Subheading>
          <ul className={`${styles.createdBy} ${styles.spacingBase}`}>
            {icon.authors.map((author) => (
              <li key={icon.id + author}>{author}</li>
            ))}
          </ul>
        </div>
        <div className={styles.spacingBase}>
          <Subheading>Third party use</Subheading>
          <p>{status}</p>
        </div>
        <div className={styles.spacingBase}>
          <Subheading>Design</Subheading>
          <Button>Download SVG</Button>
        </div>
        <div className={`${styles.download} ${styles.spacingBase}`}>
          <Subheading>Usage</Subheading>
          <div className={styles.CodeExample}>
            <span className={styles.syntaxIconTag}>&lt;Icon</span>{' '}
            <span className={styles.syntaxIconSource}>source</span>
            <span className={styles.syntaxIconTag}>=</span>
            <span className={styles.syntaxIconName}>{`"${camelCase(
              icon.basename,
            )}"`}</span>{' '}
            <span className={styles.syntaxIconTag}>/&gt;</span>
          </div>
          <span>
            Using{' '}
            <a href="https://polaris.shopify.com/components/images-and-icons/icon">
              Polaris icon component
            </a>
            {''}.
          </span>
        </div>
        <ul className={styles.keywords}>
          <Subheading>Keywords</Subheading>
          {icon.keywords.map((keyword) => (
            <li key={icon.id + keyword}>
              <div className={styles.Tag}>{keyword}</div>
            </li>
          ))}
        </ul>
      </TextContainer>
      <div className={styles.iconActions}>
        <Stack vertical>
          <Button plain>Request changes</Button>
          <Button plain>Submit a new version</Button>
        </Stack>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <div>Choose an icon to begin</div>
    </div>
  );
}
