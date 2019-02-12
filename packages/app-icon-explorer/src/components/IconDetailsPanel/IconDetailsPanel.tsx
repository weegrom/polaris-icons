import React from 'react';
import {
  Icon,
  TextContainer,
  Heading,
  Subheading,
  Button,
  Tooltip,
  TextStyle,
} from '@shopify/polaris';
import {camelCase, startCase} from 'lodash';
import {Icon as IconInterface} from '../../types';
import styles from './IconDetailsPanel.module.scss';

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
  const camelCaseBasename = camelCase(icon.basename);

  return (
    <div className={styles.iconDetailsPanel}>
      <TextContainer>
        <div className={styles.icon}>
          <Icon
            source={<div dangerouslySetInnerHTML={{__html: icon.svgContent}} />}
          />
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
          <Button url={icon.svgFile.publicURL}>Download SVG</Button>
        </div>
        <div className={`${styles.download} ${styles.spacingBase}`}>
          <Subheading>Usage</Subheading>
          <div className={styles.CodeExample}>
            <Tooltip content="Copy to clipboard">
              <div className={styles.codeHighlight}>
                <span className={styles.syntaxIconTag}>&lt;Icon</span>{' '}
                <span className={styles.syntaxIconSource}>source</span>
                <span className={styles.syntaxIconTag}>=</span>
                <span
                  className={styles.syntaxIconName}
                >{`"${camelCaseBasename}"`}</span>{' '}
                <span className={styles.syntaxIconTag}>/&gt;</span>
              </div>
            </Tooltip>
          </div>
          <span>
            See the{' '}
            <a href="https://polaris.shopify.com/components/images-and-icons/icon">
              Polaris icon component
            </a>
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
            <li key={icon.id + keyword}>
              <div className={styles.Tag}>{keyword}</div>
            </li>
          ))}
        </ul>
      </TextContainer>
      <div className={styles.iconActions}>
        <Subheading>Actions</Subheading>
        <div className={styles.spacingTight}>
          <a
            href={`https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=Update&template=request-changes-to-an-existing-icon.md&title=%5BRequest%5D%20${icon.name.replace(
              /\s+/g,
              '-',
            )}_${icon.set} changes`}
            className={styles.link}
          >
            Request to change this icon
          </a>
          <a
            href={`https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=Update&template=submit-changes-to-an-existing-icon.md&title=%5BSubmission%5D%20${icon.name.replace(
              /\s+/g,
              '-',
            )}_${icon.set} changes`}
            className={styles.link}
          >
            Submit a new version of this icon
          </a>
        </div>
      </div>
    </div>
  );
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
