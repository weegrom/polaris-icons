import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {
  Heading,
  Subheading,
  Button,
  ButtonGroup,
  Link,
  UnstyledLink,
  TextStyle,
  TextContainer,
  Banner,
  Badge,
  Stack,
} from '@shopify/polaris';
import {stringify as qsStringify} from 'query-string';

import {startCase} from 'lodash';

import {useMedia} from '../../hooks';
import {Icon as IconInterface, StyleData} from '../../types';
import {CodeBlock, ToggleButton} from './components';
import styles from './IconDetailsPanel.module.scss';
import {Seo} from '..';

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

    return <PopulatedState icon={this.props.icon} />;
  }
}

function PopulatedState({icon}: PopulatedStateProps) {
  const [selectedStyle, setSelectedStyle] = useState(
    'monotone' as keyof IconInterface['styles'],
  );

  const [previousIcon, setPreviousIcon] = useState(
    null as IconInterface | null,
  );

  // Reset the selected style if we change to a new icon
  if (icon !== previousIcon) {
    setPreviousIcon(icon);
    setSelectedStyle('monotone');
  }

  const showMonotone = () => setSelectedStyle('monotone');
  const showTwotone = () => setSelectedStyle('twotone');

  const activeStyle = icon.styles[selectedStyle] as StyleData;
  const packageName = icon.public ? 'polaris-icons' : 'polaris-icons-internal';

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

  const editMetadataContent = showBanner(icon) ? (
    <Banner>
      <p>
        This icon is missing information.{''}
        <br />
        <Link
          url={ghIconMetadataEditUrl(icon.metadataId, icon.metadataFilename)}
        >
          Update icon metadata
        </Link>
      </p>
    </Banner>
  ) : (
    <Link url={ghIconMetadataEditUrl(icon.metadataId, icon.metadataFilename)}>
      Edit icon metadata
    </Link>
  );

  const deprecatedContent = icon.deprecated ? <Badge>Deprecated</Badge> : null;

  return (
    <div>
      <Seo title={`${startCase(icon.name)} (${icon.set})`} />
      <div className={styles.iconDetailsPanelInner}>
        <Stack distribution="leading" spacing="tight">
          <Heading>{`${startCase(icon.name)} (${icon.set})`}</Heading>
          {deprecatedContent}
        </Stack>
        <div className={`${styles.spacingTight} ${styles.iconDescription}`}>
          <DescriptionMessage icon={icon} />
        </div>
        {toggleContent}

        <div className={`${styles.spacingBase} ${styles.icon}`}>
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(
              activeStyle.svgContent,
            )}`}
            alt={`SVG for ${icon.name}`}
          />
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
              <>
                Learn how to{' '}
                <Link url="https://github.com/Shopify/polaris-icons/tree/master/packages/polaris-icons#usage">
                  import icons
                </Link>
                .
              </>
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
              from {`'@shopify/${packageName}'`};
            </CodeBlock.Import>
          </CodeBlock>
        </div>

        <div>
          <CodeBlock
            title="Usage"
            footer={
              <>
                Learn more about the{' '}
                <Link url="https://polaris.shopify.com/components/images-and-icons/icon">
                  icon component
                </Link>
                .
              </>
            }
          >
            <CodeBlock.Tag>&lt;Icon</CodeBlock.Tag>
            <br />
            <CodeBlock.Attribute>{'  '}source</CodeBlock.Attribute>
            <CodeBlock.Tag>=</CodeBlock.Tag>
            <CodeBlock.ImportItems>{`{${
              activeStyle.importName
            }}`}</CodeBlock.ImportItems>
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
          <Link
            url={ghNewIssueUrl(
              'suggest-changes-to-an-existing-icon.md',
              `[Submission] ${icon.metadataFilename} changes`,
              ['Update'],
            )}
          >
            Create a new version of this icon
          </Link>
        </div>

        <div className={styles.spacingTight}>{editMetadataContent}</div>
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

function ghIconMetadataEditUrl(name: string, filename: string) {
  const encodedMessage = encodeURIComponent(`[${name}] Fix metadata`);
  return `https://github.com/Shopify/polaris-icons/edit/master/packages/polaris-icons-raw/icons/polaris/${filename}.yml?message=${encodedMessage}&target_branch=fix-${filename}&description=https://polaris-icons.shopify.com/?icon=${name}`;
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

function stringifyAliases(aliases: string[]) {
  return aliases
    .map((alias) => `"${startCase(alias.replace(/_.+$/, ''))}"`)
    .join(',');
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

function DescriptionMessage({icon}: {icon: IconInterface}) {
  if (icon.deprecated) {
    return (
      <p>
        This icon is deprecated and has no replacement. It will be removed in
        the next major version.
      </p>
    );
  }

  const deprecatedAliasesContent =
    icon.deprecatedAliases.length > 0 ? (
      <p>
        This icon was previously called{' '}
        {stringifyAliases(icon.deprecatedAliases)}.
      </p>
    ) : null;

  const iconDescription = /N\/A/.test(icon.descriptionHtml)
    ? 'No description yet.'
    : icon.descriptionHtml;

  return (
    <TextContainer>
      <div dangerouslySetInnerHTML={{__html: iconDescription}} />
      {deprecatedAliasesContent}
    </TextContainer>
  );
}

function IconKeyword({iconName, word}: {iconName: string; word: string}) {
  // Exclude the current icon at small sizes so that the panel is dismissed and
  // you can see the search results instantly
  const detailsTriggerWidthPx = 769;
  const whenDetailsModal = useMedia(
    [`(min-width: ${detailsTriggerWidthPx / 16}em)`],
    [true],
    false,
  );

  const queryParams = {icon: iconName, q: `#${word}`};
  if (!whenDetailsModal) {
    delete queryParams.icon;
  }

  return (
    <li>
      <UnstyledLink
        url={`/?${qsStringify(queryParams)}`}
        className={styles.Tag}
      >
        {word}
      </UnstyledLink>
    </li>
  );
}
