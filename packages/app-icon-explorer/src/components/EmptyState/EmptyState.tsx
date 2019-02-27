import React from 'react';
import {Button, ButtonGroup, DisplayText, TextStyle} from '@shopify/polaris';
import styles from './EmptyState.module.scss';

export default function EmptyState() {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.content}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41">
            <path d="M27.78 29.9l-3.287-3.286A14.938 14.938 0 0 1 15 30C6.716 30 0 23.284 0 15 0 6.716 6.716 0 15 0c8.284 0 15 6.716 15 15 0 3.602-1.27 6.907-3.386 9.493l3.287 3.286.696-.696a1.985 1.985 0 0 1 2.812 0l7.009 7.008a1.989 1.989 0 0 1 0 2.812l-3.515 3.514a1.985 1.985 0 0 1-2.812 0l-7.008-7.008a1.987 1.987 0 0 1 0-2.812l.696-.696.001-.001zM15 27c6.627 0 12-5.373 12-12S21.627 3 15 3 3 8.373 3 15s5.373 12 12 12zm22.606 8.497l-5.603-5.603-2.108 2.11 5.602 5.602 2.11-2.11-.001.001z" />
          </svg>
          <p className={styles.DisplayText}>
            <DisplayText size="small">No icons found</DisplayText>
          </p>
          <p>
            <TextStyle variation="subdued">
              Try searching for something else, or use one of the actions below.
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

function ghNewIssueUrl(template: string, title: string) {
  const encodedTemplate = encodeURIComponent(template);
  const encodedTitle = encodeURIComponent(title);

  return `https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=New&template=${encodedTemplate}&title=${encodedTitle}`;
}
