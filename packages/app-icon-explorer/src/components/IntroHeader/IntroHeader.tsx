import React from 'react';
import {
  TextContainer,
  DisplayText,
  Button,
  ButtonGroup,
  Link,
} from '@shopify/polaris';
import {graphql, useStaticQuery} from 'gatsby';

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
  const data = useStaticQuery(detailsQuery);

  return (
    <div>
      <TextContainer>
        <DisplayText size="extraLarge">
          {data.site.siteMetadata.title}
        </DisplayText>
        <p>
          A collection of simple and informative icons that draw on the visual
          language of the{' '}
          <Link url="https://polaris.shopify.com">Polaris design system</Link>.
          Use these icons in your projects or third-party apps to promote a
          consistent experience across the Shopify platform.
        </p>
      </TextContainer>
      <div className={styles.buttons}>
        <ButtonGroup>
          <Button url="https://github.com/Shopify/polaris-icons">
            View on GitHub
          </Button>
          <Button
            plain
            url="https://github.com/Shopify/polaris-icons/blob/master/README.md"
          >
            Learn more
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
