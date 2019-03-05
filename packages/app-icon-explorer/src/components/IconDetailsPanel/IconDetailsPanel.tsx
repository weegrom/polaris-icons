import React from 'react';
import * as PropTypes from 'prop-types';
import {
  TextContainer,
  Heading,
  Subheading,
  Button,
  TextStyle,
  Banner,
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

const showBanner = (icon) =>
  Object.values(icon).some(
    (value) => typeof value === 'string' && /N\/A/.test(value),
  ) ||
  icon.keywords.includes('N/A') ||
  icon.authors.includes('N/A');

export default class IconDetailsPanel extends React.Component<Props, State> {
  static childContextTypes = {
    withinContentContainer: PropTypes.bool,
  };

  state = {
    isClient: false,
  };

  getChildContext() {
    return {
      withinContentContainer: true,
    };
  }

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

function PopulatedState({icon}: {icon: IconInterface}) {
  const status = icon.public ? 'Allowed' : 'Not allowed';
  const linkToMetadataEditForm = ghIconMetadataEditUrl(icon.basename);

  return (
    <div>
      <div className={styles.iconDetailsPanelInner}>
        <TextContainer>
          <div className={styles.icon}>
            <img src={icon.svgFile.publicURL} alt="" />
          </div>
          <div className={`${styles.spacingBase}${styles.spacingTop}`}>
            <div className={styles.spacingExtraTight}>
              <Heading>{`${startCase(icon.name)} (${icon.set}${
                icon.style ? `, ${icon.style}` : ''
              })`}</Heading>
            </div>
            <div
              className={styles.iconDescription}
              dangerouslySetInnerHTML={{__html: icon.descriptionHtml}}
            />
          </div>
          <div className={`${styles.spacingBase} ${styles.spacingButton}`}>
            <Button
              url={icon.svgFile.publicURL}
              download={`${icon.basename}.svg`}
            >
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
              <OutboundLink
                className="contentLink"
                href="https://polaris.shopify.com/components/images-and-icons/icon"
              >
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
          <div className={styles.spacingLoose}>
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
          <OutboundLink
            href={ghNewIssueUrl(
              'submit-changes-to-an-existing-icon.md',
              `[Submission] ${icon.basename} changes`,
            )}
            className={`${styles.link} contentLink`}
          >
            Submit a new version of this icon
          </OutboundLink>

          {/* eslint-disable-next-line shopify/jsx-no-complex-expressions */}
          {showBanner(icon) ? (
            <div className={styles.bannerWrapper}>
              <Banner>
                <p>
                  This icon is missing information. Please take a moment to{' '}
                  <OutboundLink
                    className="contentLink"
                    href={linkToMetadataEditForm}
                  >
                    improve its metadata
                  </OutboundLink>
                  .
                </p>
              </Banner>
            </div>
          ) : (
            <OutboundLink
              className={`${styles.link} contentLink`}
              href={linkToMetadataEditForm}
            >
              Edit icon metadata
            </OutboundLink>
          )}
        </div>
      </div>
    </div>
  );
}

function ghIconMetadataEditUrl(basename: string) {
  const encodedMessage = encodeURIComponent(`Fix metadata for ${basename}`);
  return `https://github.com/Shopify/polaris-icons/edit/master/packages/polaris-icons-raw/icons/polaris/${basename}.yml?message=${encodedMessage}&target_branch=fix-${basename}`;
}
export function ghNewIssueUrl(
  template: string,
  title: string,
  assignees: string[],
) {
  const encodedTemplate = encodeURIComponent(template);
  const encodedTitle = encodeURIComponent(title);
  const stringifiedAssignees = assignees.join(',');

  return `https://github.com/Shopify/polaris-icons/issues/new?assignees=${stringifiedAssignees}&labels=Update&template=${encodedTemplate}&title=${encodedTitle}`;
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
