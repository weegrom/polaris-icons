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
              A cohesive collection of simple and informative icons that we use
              across the Shopify platform. Our icons draw on the visual language
              of the Polaris design system. Each icon is an exercise in
              distillation, in taking a metaphor and representing its most basic
              form. All icons are available through Abstract and GitHub. Learn
              how to use our icons in our{' '}
              <OutboundLink
                className="contentLink"
                href="https://polaris.shopify.com/design/icons"
              >
                icon usage guidelines
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
