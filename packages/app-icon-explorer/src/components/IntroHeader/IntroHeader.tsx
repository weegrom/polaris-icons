import React from 'react';
import {
  TextContainer,
  DisplayText,
  Button,
  ButtonGroup,
} from '@shopify/polaris';
import {StaticQuery, graphql} from 'gatsby';
import {OutboundLink} from 'gatsby-plugin-google-gtag';
import {ghNewIssueUrl} from '../IconDetailsPanel';

import styles from './IntroHeader.module.scss';

export const detailsQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default function IntroHeader() {
  return (
    <StaticQuery
      query={detailsQuery}
      // eslint-disable-next-line react/jsx-no-bind
      render={(data) => (
        <div>
          <TextContainer>
            <DisplayText size="extraLarge">
              {data.site.siteMetadata.title}
            </DisplayText>
            <p>
              Use these icons in your projects to promote a consistent
              experience across the Shopify platform. If you can’t find the
              icon you need, then contribute to the collection by{' '}
              <OutboundLink
                className="contentLink"
                href="https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=Update&template=submit-changes-to-an-existing-icon.md&title=%5BSubmission%5D%20add-block_major_monotone%20changes"
              >
                updating an existing icon
              </OutboundLink>
              , or{' '}
              <OutboundLink
                className="contentLink"
                href="https://vault.shopify.com/Polaris-icon-creation-guidelines"
              >
                creating a new one
              </OutboundLink>
              . If you have any questions or feedback,{' '}
              <OutboundLink
                className="contentLink"
                href={ghNewIssueUrl(
                  'feedback-for-polaris-icons-ui.md',
                  '[feedback] ',
                  ['HYPD'],
                )}
              >
                open an issue
              </OutboundLink>{' '}
              or find us in{' '}
              <OutboundLink
                className="contentLink"
                href="https://shopify.slack.com/messages/CCNUS0FML"
              >
                #polaris-tooling
              </OutboundLink>{' '}
              on Slack.
            </p>
          </TextContainer>
          <div className={styles.buttons}>
            <ButtonGroup>
              <Button url="https://github.com/Shopify/polaris-icons">
                View on GitHub
              </Button>
              <Button
                plain
                url="https://github.com/Shopify/polaris-icons/blob/master/FREQUENTLY_ASKED_QUESTIONS.md"
              >
                Frequently asked questions
              </Button>
            </ButtonGroup>
          </div>
        </div>
      )}
    />
  );
}
