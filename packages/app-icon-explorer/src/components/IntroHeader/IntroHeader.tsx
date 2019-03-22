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
              icon that you need, then contribute to the collection by{' '}
              <OutboundLink
                className="contentLink"
                href="https://polaris.shopify.com/design/icons"
              >
                updating an existing icon
              </OutboundLink> 
              , or{' '}
              <OutboundLink
                className="contentLink"
                href="https://polaris.shopify.com/design/icons"
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
