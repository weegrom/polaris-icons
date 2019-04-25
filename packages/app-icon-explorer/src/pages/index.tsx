import React from 'react';
import {graphql, navigate} from 'gatsby';
import classNames from 'classnames';
import {capitalize, sortBy} from 'lodash';
import {parse as qsParse, stringify as qsStringify} from 'query-string';
import {DisplayText, Icon, Scrollable} from '@shopify/polaris';
import {MobileCancelMajorMonotone} from '@shopify/polaris-icons';
import {Shortcut} from '@shopify/react-shortcuts';

import {
  AppFrame,
  EmptyState,
  Seo,
  IconsListing,
  IconDetailsPanel,
  IntroHeader,
} from '../components';
import {Icon as IconInterface} from '../types';

import styles from './index.module.scss';

interface Props {
  location: any;
  data: {
    allPolarisYaml: {
      edges: {
        node: IconInterface;
      }[];
    };
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

interface State {
  isClient: boolean;
  searchText: string;
  queryParams: {
    icon?: string;
    q?: string;
  };
}

export default class IndexPage extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    // Here be dragons. We have two types of search queries:
    // - Searches from the URL query params (via props.location, which is
    //    provided by react-router's context)
    // - The "Live" search that updates as you type into the search box (via
    //    props.searchText)
    //
    // If we see that the url has changed since last render then we want to use
    // that as the searchText, otherwise don't adjust anything
    const query = qsParse(props.location.search);
    const newQueryParams = {
      q: Array.isArray(query.q) ? query.q[0] : query.q,
      icon: query.icon,
    };

    if (
      newQueryParams.q !== state.queryParams.q ||
      newQueryParams.icon !== state.queryParams.icon
    ) {
      return {
        searchText: newQueryParams.q || '',
        queryParams: newQueryParams,
      };
    }

    return null;
  }

  state: State = {
    isClient: false,
    queryParams: {},
    searchText: '',
  };

  // Because Gatsby spits out a static page we want to initially render the
  // unfiltered state with no icon selected and then rerender immediately. This
  // ensures the server-provided content matches the initially rendered
  // state after hydration.
  componentDidMount() {
    this.setState({isClient: true});
  }

  render() {
    const searchText = this.state.isClient ? this.state.searchText : '';

    const icons = sortBy(
      this.props.data.allPolarisYaml.edges.map((edge) => edge.node),
      ['name'],
    );
    const iconSets = Object.entries(
      buildIconSets(filterIcons(icons, searchText)),
    );

    const isFiltered = searchText !== '';

    const currentIcon =
      this.state.isClient && this.state.queryParams.icon
        ? icons.find((icon) => icon.metadataId === this.state.queryParams.icon)
        : undefined;
    const activeIconId = currentIcon ? currentIcon.metadataId : undefined;

    const introHeaderMarkup = isFiltered ? null : <IntroHeader />;

    const anySetHasMatches = iconSets.some(([, iconSet]) => iconSet.length > 0);

    const resultsMarkup = anySetHasMatches ? (
      <>
        {iconSets.map(([setName, icons]) => (
          <IconsListing
            key={setName}
            heading={`${capitalize(setName)} icons`}
            icons={icons}
            activeIconId={activeIconId}
            showCount={isFiltered}
          />
        ))}
      </>
    ) : (
      <EmptyState />
    );

    const panelClasses = classNames({
      [styles.panel]: true,
      [styles.panelIsEmpty]: !currentIcon,
    });

    // Set a key on the panel so that it fully rerenders the panel, including
    // reseting the scroll position when you change between icons
    const panelKey = currentIcon ? currentIcon.metadataFilename : 'emptypanel';

    return (
      <AppFrame
        queryParams={this.state.queryParams}
        searchText={searchText}
        onSearchChange={this.handleSearchChange}
        onSearchBlur={this.handleSearchBlur}
        onSearchCancel={this.handleSearchCancel}
      >
        <Seo title={this.props.data.site.siteMetadata.title} />
        <div className={styles.page}>
          <div className={styles.listingWrapper}>
            <div className={styles.listing}>
              {introHeaderMarkup}
              {resultsMarkup}
            </div>
          </div>
          <div className={panelClasses}>
            <div className={styles.panelInner} key={panelKey}>
              <div className={styles.panelHeader}>
                <div className={styles.panelHeaderTitle}>
                  <Shortcut
                    ordered={['Escape']}
                    onMatch={this.handelPanelClose}
                  />
                  <DisplayText size="small">Icon Details</DisplayText>
                </div>
                <button
                  type="button"
                  onClick={this.handelPanelClose}
                  className={styles.panelHeaderCloseButton}
                >
                  <Icon source={MobileCancelMajorMonotone} color="inkLighter" />
                </button>
              </div>

              <Scrollable className={styles.panelDetails} shadow>
                <IconDetailsPanel icon={currentIcon} />
              </Scrollable>
            </div>
          </div>
        </div>
      </AppFrame>
    );
  }

  handleSearchChange = (value: string) => {
    this.setState({searchText: value});
  };

  handleSearchBlur = () => {
    if (this.state.queryParams.q !== this.state.searchText) {
      this.persistSearchText(this.state.searchText);
    }
  };

  handleSearchCancel = () => {
    if (this.state.queryParams.q !== '') {
      this.persistSearchText('');
    }
  };

  handelPanelClose = () => {
    const searchText = this.state.isClient ? this.state.searchText : '';
    const isFiltered = searchText !== '';

    navigate(`/?${qsStringify(isFiltered ? {q: searchText} : {})}`);
  };

  private persistSearchText(dirtySearchText: string) {
    if (dirtySearchText !== '' && (window as any).gtag) {
      (window as any).gtag('event', 'search', {
        /* eslint-disable-next-line camelcase */
        event_category: 'icons',
        /* eslint-disable-next-line camelcase */
        search_term: dirtySearchText,
      });
    }

    const newQueryString = qsStringify({
      ...this.state.queryParams,
      ...{q: dirtySearchText === '' ? undefined : dirtySearchText},
    });

    navigate(`?${newQueryString}`);
  }
}

function filterIcons(icons: IconInterface[], searchText: string) {
  const containsText = (string: string) => {
    // If the search text starts with a # then do an exact match
    if (searchText.startsWith('#')) {
      return string.toUpperCase() === searchText.slice(1).toUpperCase();
    }
    // Otherwise check for it anywhere in the string
    return string.toUpperCase().includes(searchText.toUpperCase());
  };

  return icons.filter((icon) => {
    const allPossibleImportNames = icon.styles.reduce<string[]>(
      (memo, style) =>
        memo.concat([style.importName], style.deprecatedImportNames),
      [],
    );

    return (
      containsText(icon.name) ||
      icon.keywords.some(containsText) ||
      allPossibleImportNames.some(containsText)
    );
  });
}

function buildIconSets(icons: IconInterface[]) {
  return icons.reduce<{[key: string]: IconInterface[]}>((memo, icon) => {
    if (!memo[icon.set]) {
      memo[icon.set] = [];
    }
    memo[icon.set].push(icon);

    return memo;
  }, {});
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allPolarisYaml {
      edges {
        node {
          name
          metadataId
          metadataFilename
          set
          descriptionHtml
          public
          keywords
          imageSize
          styles {
            styleName
            importName
            deprecatedImportNames
            svgContent
            svgFile {
              publicURL
              base
            }
          }
        }
      }
    }
  }
`;
