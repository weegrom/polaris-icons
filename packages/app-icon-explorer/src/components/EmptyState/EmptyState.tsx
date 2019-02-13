import React from 'react';
import {Button, ButtonGroup, Heading, TextStyle} from '@shopify/polaris';
import styles from './EmptyState.module.scss';

export default function EmptyState() {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.content}>
          <img src="http://placehold.it/230" alt="Placeholder illustration" />
          <Heading>No icons found</Heading>
          <p>
            <TextStyle variation="subdued">
              Try search for something else, or use one of the actions below.
            </TextStyle>
          </p>
        </div>
        <div className={styles.buttons}>
          <ButtonGroup>
            <Button url={ghNewIssueUrl('request-a-new-icon.md', '[Request]')}>
              Request icon
            </Button>
            <Button url={ghNewIssueUrl('submit-a-new-icon.md', '[Submission]')}>
              Submit icon
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

function ghNewIssueUrl(template, title) {
  const encodedTemplate = encodeURIComponent(template);
  const encodedTitle = encodeURIComponent(title);

  return `https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=New&template=${encodedTemplate}&title=${encodedTitle}`;
}
