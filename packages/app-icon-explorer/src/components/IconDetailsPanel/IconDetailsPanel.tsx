import React from 'react';
import {
  TextContainer,
  Heading,
  Subheading,
  Button,
  TextStyle,
} from '@shopify/polaris';
import {OutboundLink} from 'gatsby-plugin-gtag';
import {startCase} from 'lodash';
import {Icon as IconInterface} from '../../types';
import styles from './IconDetailsPanel.module.scss';
import IconCopy from './components/IconCopy';

interface Props {
  icon?: IconInterface;
}

interface State {
  isClient: boolean;
}

export default class IconPanel extends React.Component<Props, State> {
  state = {
    isClient: false,
  };

  // Because Gatsby spits out a static page we want to initially render the
  // empty state and then rerender immediately. This ensures the server-provided
  // content matches the initially rendered state after hydration.
  componentDidMount() {
    this.setState({isClient: true});
  }

  render() {
    if (!this.state.isClient || !this.props.icon) {
      return <EmptyState />;
    }

    return <PopulatedState icon={this.props.icon} />;
  }
}

function PopulatedState({icon}) {
  const status = icon.public ? 'Allowed' : 'Not allowed';

  return (
    <div>
      <TextContainer>
        <div className={styles.icon}>
          <img src={icon.svgFile.publicURL} alt="" />
        </div>
        <div className={styles.spacingBase}>
          <div className={styles.spacingExtraTight}>
            <Heading>{`${startCase(icon.name)} (${icon.set})`}</Heading>
          </div>
          <div
            className={styles.iconDescription}
            dangerouslySetInnerHTML={{__html: icon.descriptionHtml}}
          />
        </div>
        <div className={styles.spacingBase}>
          <Subheading>Design</Subheading>
          <Button url={icon.svgFile.publicURL} download>
            Download SVG
          </Button>
        </div>
        <div className={`${styles.usage} ${styles.spacingBase}`}>
          <Subheading>Usage</Subheading>
          <div className={styles.CodeExample}>
            <IconCopy reactname={icon.reactname} />
          </div>
          <span>
            See the{' '}
            <OutboundLink href="https://polaris.shopify.com/components/images-and-icons/icon">
              Polaris icon component
            </OutboundLink>
            {''}.
          </span>
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
          <Subheading>Partner use</Subheading>
          <p>{status}</p>
        </div>
        <ul className={`${styles.keywords} ${styles.spacingLoose}`}>
          <Subheading>Keywords</Subheading>
          {icon.keywords.map((keyword) => (
            <li key={icon.id + keyword} className={styles.keywordsItem}>
              <div className={styles.Tag}>{keyword}</div>
            </li>
          ))}
        </ul>
      </TextContainer>
      <div className={styles.iconActions}>
        <Subheading>Actions</Subheading>
        <div className={styles.spacingTight}>
          <OutboundLink
            href={ghNewIssueUrl(
              'request-changes-to-an-existing-icon.md',
              `[Request] ${icon.basename} changes`,
            )}
            className={styles.link}
          >
            Request to change this icon
          </OutboundLink>
          <OutboundLink
            href={ghNewIssueUrl(
              'submit-changes-to-an-existing-icon.md',
              `[Submission] ${icon.basename} changes`,
            )}
            className={styles.link}
          >
            Submit a new version of this icon
          </OutboundLink>
        </div>
      </div>
    </div>
  );
}

function ghNewIssueUrl(template, title) {
  const encodedTemplate = encodeURIComponent(template);
  const encodedTitle = encodeURIComponent(title);

  return `https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=Update&template=${encodedTemplate}&title=${encodedTitle}`;
}

function EmptyState() {
  return (
    <div className={styles.empty}>
      <div>
        <TextStyle variation="subdued">Choose an icon to begin</TextStyle>
      </div>
    </div>
  );
}
