import React from 'react';
import {Button, ButtonGroup, Heading, TextStyle} from '@shopify/polaris';
import styles from './EmptyState.module.scss';

export default function EmptyState() {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.content}>
          <img src="http://placehold.it/230" />
          <Heading>No icons found</Heading>
          <p>
            <TextStyle variation="subdued">
              Try search for something else, or use one of the actions below.
            </TextStyle>
          </p>
        </div>
        <div className={styles.buttons}>
          <ButtonGroup>
            <Button url="https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=New&template=request-a-new-icon.md&title=%5BRequest%5Dhttps://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=New&template=request-a-new-icon.md&title=%5BRequest%5D">
              Request icon
            </Button>
            <Button url="https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=New&template=submit-a-new-icon.md&title=%5BSubmission%5D">
              Submit icon
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
