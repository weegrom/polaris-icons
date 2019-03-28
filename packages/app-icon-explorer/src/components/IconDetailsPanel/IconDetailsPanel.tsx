import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {
  Heading,
  Subheading,
  Button,
  ButtonGroup,
  Icon,
  TextStyle,
  Banner,
} from '@shopify/polaris';
import {stringify as qsStringify} from 'query-string';
import {Link} from 'gatsby';
import {OutboundLink} from 'gatsby-plugin-google-gtag';
import {startCase} from 'lodash';

import {Icon as IconInterface, StyleData} from '../../types';
import ToggleButton from '../ToggleButton';
import CodeBlock from './components/CodeBlock';
import styles from './IconDetailsPanel.module.scss';

interface Props {
  icon?: IconInterface;
}

interface PopulatedStateProps {
  icon: IconInterface;
}

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

    // Set a key to create a new component instead of reusing the existing
    // one and thus persisting selectedStyle state across different icons
    return (
      <PopulatedState
        key={this.props.icon.metadataFilename}
        icon={this.props.icon}
      />
    );
  }
}

function PopulatedState({icon}: PopulatedStateProps) {
  const [selectedStyle, setSelectedStyle] = useState(
    'monotone' as keyof IconInterface['styles'],
  );
  const showMonotone = () => setSelectedStyle('monotone');
  const showTwotone = () => setSelectedStyle('twotone');

  const activeStyle = icon.styles[selectedStyle] as StyleData;

  /* eslint-disable react/jsx-no-bind */
  const toggleContent =
    icon.set === 'major' ? (
      <div>
        <ButtonGroup fullWidth segmented>
          <ToggleButton
            pressed={selectedStyle === 'monotone'}
            onClick={showMonotone}
          >
            Monotone
          </ToggleButton>
          <ToggleButton
            pressed={selectedStyle === 'twotone'}
            onClick={showTwotone}
            disabled={!icon.styles.twotone}
          >
            Twotone
          </ToggleButton>
        </ButtonGroup>
      </div>
    ) : (
      undefined
    );
  /* eslint-enable react/jsx-no-bind */

  const editMetadataContent = showBanner(icon) ? (
    <Banner>
      <p>
        This icon is missing information.{' '}
        <OutboundLink
          className="contentLink"
          href={ghIconMetadataEditUrl(icon.metadataFilename)}
        >
          Update the metadata for this icon
        </OutboundLink>
        .
      </p>
    </Banner>
  ) : (
    <OutboundLink
      className="contentLink"
      href={ghIconMetadataEditUrl(icon.metadataFilename)}
    >
      Edit icon metadata
    </OutboundLink>
  );

  return (
    <div>
      <div className={styles.iconDetailsPanelInner}>
        <Heading>{`${startCase(icon.name)} (${icon.set})`}</Heading>

        <div
          className={`${styles.spacingTight} ${styles.iconDescription}`}
          dangerouslySetInnerHTML={{__html: icon.descriptionHtml}}
        />

        {toggleContent}

        <div className={`${styles.spacingBase} ${styles.icon}`}>
          <Icon source={encodeURIComponent(activeStyle.svgContent)} />
        </div>

        <div className={styles.spacingBase}>
          <Button
            url={activeStyle.svgFile.publicURL}
            download={activeStyle.svgFile.base}
          >
            Download SVG
          </Button>
        </div>

        <div>
          <CodeBlock
            title="Import"
            footer={
              <div>
                Learn how to use{' '}
                <OutboundLink
                  className="contentLink"
                  href="https://polaris.shopify.com/components/images-and-icons/icon"
                >
                  Polaris icons
                </OutboundLink>
                .
              </div>
            }
          >
            <CodeBlock.Import>import</CodeBlock.Import>
            <CodeBlock.ImportItems>
              {' {'}
              <br />
              {`  ${activeStyle.importName}`}
              <br />
              {'} '}
            </CodeBlock.ImportItems>
            <CodeBlock.Import>
              from {`'@shopify/polaris-icons'`};
            </CodeBlock.Import>
          </CodeBlock>
        </div>

        <div>
          <CodeBlock
            title="Usage"
            footer={
              <div>
                Using{' '}
                <OutboundLink
                  className="contentLink"
                  href="https://polaris.shopify.com/components/images-and-icons/icon"
                >
                  Polaris icon component
                </OutboundLink>
                .
              </div>
            }
          >
            <CodeBlock.Tag>&lt;Icon</CodeBlock.Tag>
            <br />
            <CodeBlock.Attribute>{'  '}source</CodeBlock.Attribute>
            <CodeBlock.Tag>=</CodeBlock.Tag>
            <CodeBlock.Import>{`{${activeStyle.importName}}`}</CodeBlock.Import>
            <CodeBlock.Tag> /&gt;</CodeBlock.Tag>
          </CodeBlock>
        </div>

        <div className={styles.keywords}>
          <Subheading>Keywords</Subheading>
          <ul>
            {icon.keywords.map((keyword) => (
              <IconKeyword
                key={keyword}
                word={keyword}
                iconName={icon.metadataId}
              />
            ))}
          </ul>
        </div>

        <div>
          <OutboundLink
            href={ghNewIssueUrl(
              'submit-changes-to-an-existing-icon.md',
              `[Submission] ${icon.metadataFilename} changes`,
              ['Update'],
            )}
            className={`${styles.link} contentLink`}
          >
            Create a new version of this icon
          </OutboundLink>

          {editMetadataContent}
        </div>
      </div>
    </div>
  );
}

function showBanner(icon: IconInterface) {
  return (
    Object.values(icon).some(
      (value) => typeof value === 'string' && /N\/A/.test(value),
    ) || icon.keywords.includes('N/A')
  );
}

function ghIconMetadataEditUrl(filename: string) {
  const encodedMessage = encodeURIComponent(`Fix metadata for ${filename}`);
  return `https://github.com/Shopify/polaris-icons/edit/master/packages/polaris-icons-raw/icons/polaris/${filename}.yml?message=${encodedMessage}&target_branch=fix-${filename}`;
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

function IconKeyword({iconName, word}: {iconName: string; word: string}) {
  const linkTo = `/?${qsStringify({icon: iconName, q: `#${word}`})}`;

  return (
    <li>
      <Link to={linkTo} className={styles.Tag}>
        {word}
      </Link>
    </li>
  );
}
