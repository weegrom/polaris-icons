import React from 'react';
import * as PropTypes from 'prop-types';
import {
  TextContainer,
  Heading,
  Subheading,
  Button,
  Icon,
  TextStyle,
  Banner,
} from '@shopify/polaris';
import {stringify as qsStringify} from 'query-string';
import {Link} from 'gatsby';
import {OutboundLink} from 'gatsby-plugin-google-gtag';
import {startCase} from 'lodash';
import {Icon as IconInterface} from '../../types';
import styles from './IconDetailsPanel.module.scss';
import IconCopy from './components/IconCopy';

interface Props {
  icon?: IconInterface;
}

const showBanner = (icon: IconInterface) =>
  Object.values(icon).some(
    (value) => typeof value === 'string' && /N\/A/.test(value),
  ) ||
  icon.keywords.includes('N/A') ||
  icon.authors.includes('N/A');

export default class IconDetailsPanel extends React.Component<Props> {
  static childContextTypes = {
    withinContentContainer: PropTypes.bool,
  };

  getChildContext() {
    return {
      withinContentContainer: true,
    };
  }

  render() {
    if (!this.props.icon) {
      return <EmptyState />;
    }

    return <PopulatedState icon={this.props.icon} />;
  }
}

function PopulatedState({icon}: {icon: IconInterface}) {
  const linkToMetadataEditForm = ghIconMetadataEditUrl(
    icon.set === 'major'
      ? icon.basename.replace(/_(monotone|twotone)$/g, '')
      : icon.basename,
  );

  return (
    <div>
      <div className={styles.iconDetailsPanelInner}>
        <TextContainer>
          <div className={styles.icon}>
            <Icon
              source={encodeURIComponent(icon.styles.monotone.svgContent)}
            />
          </div>
          <div className={`${styles.spacingBase}${styles.spacingTop}`}>
            <div className={styles.spacingExtraTight}>
              <Heading>{`${startCase(icon.name)} (${icon.set})`}</Heading>
            </div>
            <div
              className={styles.iconDescription}
              dangerouslySetInnerHTML={{__html: icon.descriptionHtml}}
            />
          </div>
          <div className={`${styles.spacingBase} ${styles.spacingButton}`}>
            <Button
              url={icon.styles.monotone.svgFile.publicURL}
              download={`${icon.basename}.svg`}
            >
              Download SVG
            </Button>
          </div>
          <div className={`${styles.usage} ${styles.spacingBase}`}>
            <Subheading>Usage</Subheading>
            <IconCopy reactname={icon.reactname} />
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
          <div className={styles.createdBy}>
            <Subheading>Created by</Subheading>
            <ul className={`${styles.createdBy} ${styles.spacingBase}`}>
              {icon.authors.map((author) => (
                <li key={icon.id + author}>{author}</li>
              ))}
            </ul>
          </div>
          <ul className={`${styles.keywords} ${styles.spacingLoose}`}>
            <Subheading>Keywords</Subheading>
            {icon.keywords.map((keyword) => (
              <li key={icon.id + keyword} className={styles.keywordsItem}>
                <Link
                  to={`/?${qsStringify({
                    icon: icon.reactname,
                    q: `#${keyword}`,
                  })}`}
                  className={styles.Tag}
                >
                  {keyword}
                </Link>
              </li>
            ))}
          </ul>
        </TextContainer>
        <div className={styles.iconActions}>
          <OutboundLink
            href={ghNewIssueUrl(
              'submit-changes-to-an-existing-icon.md',
              `[Submission] ${icon.basename} changes`,
              ['Update'],
            )}
            className={`${styles.link} contentLink`}
          >
            Create a new version of this icon
          </OutboundLink>

          {/* eslint-disable-next-line shopify/jsx-no-complex-expressions */}
          {showBanner(icon) ? (
            <div className={styles.bannerWrapper}>
              <Banner>
                <p>
                  This icon is missing information.{' '}
                  <OutboundLink
                    className="contentLink"
                    href={linkToMetadataEditForm}
                  >
                    Update the metadata for this icon
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
  labels: string[] = [],
  assignees: string[] = [],
) {
  const encodedTemplate = encodeURIComponent(template);
  const encodedTitle = encodeURIComponent(title);
  const stringifiedLabels = labels.join(',');
  const stringifiedAssignees = assignees.join(',');

  return `https://github.com/Shopify/polaris-icons/issues/new?assignees=${stringifiedAssignees}&labels=${stringifiedLabels}&template=${encodedTemplate}&title=${encodedTitle}`;
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
