import React from 'react';
import {
  TextContainer,
  DisplayText,
  Button,
  ButtonGroup,
} from '@shopify/polaris';
import styles from './IntroHeader.module.scss';

export default function IntroHeader() {
  return (
    <div className={styles.container}>
      <TextContainer>
        <DisplayText size="extraLarge">Polaris icons</DisplayText>
        <p>
          Polaris icons are simple and informative. They build on the visual
          language of the Polaris design system. Each icon is an exercise in
          distillation, in taking a metaphor and representing its most basic
          form. All icons are available through Abstract and GitHub. Learn how
          to use our icons in our{' '}
          <a
            className={styles.link}
            href="https://polaris.shopify.com/design/icons"
          >
            icon usage guidelines
          </a>
          {''}. If you have any questions or feedback, find us in&nbsp;
          <a
            className={styles.link}
            href="https://shopify.slack.com/messages/CCNUS0FML"
          >
            #polaris-tooling
          </a>{' '}
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
            url="https://github.com/Shopify/polaris-icons/blob/master/LICENSE.md"
          >
            Usage license
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
