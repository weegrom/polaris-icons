import React from 'react';
import {
  TextContainer,
  DisplayText,
  Button,
  ButtonGroup,
} from '@shopify/polaris';
import {StaticQuery, graphql} from 'gatsby';
import {OutboundLink} from 'gatsby-plugin-google-gtag';

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
              A collection of simple and informative icons that draw on the
              visual language of the{' '}
              <OutboundLink href="https://polaris.shopify.com">
                Polaris design system
              </OutboundLink>
              . Use these icons in your projects or third-party apps to promote
              a consistent experience across the Shopify platform.
            </p>
          </TextContainer>
          <div className={styles.buttons}>
            <ButtonGroup>
              <Button url="https://github.com/Shopify/polaris-icons">
                View on GitHub
              </Button>
              <OutboundLink
                className="contentLink"
                href="https://github.com/Shopify/polaris-icons/blob/master/WELCOME.md"
              >
                Learn more
              </OutboundLink>
            </ButtonGroup>
          </div>
        </div>
      )}
    />
  );
}
