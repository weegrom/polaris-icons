import React from 'react';
import {graphql} from 'gatsby';
import {parse as qsParse} from 'query-string';
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
  };
}

interface State {
  searchText: string;
}

// eslint-disable-next-line
export default class IndexPage extends React.Component<Props, State> {
  state = {
    searchText: '',
  };

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  render() {
    const icons = this.props.data.allPolarisYaml.edges.map((edge) => edge.node);
    const [majorIcons, minorIcons] = buildIconSets(
      filterIcons(icons, this.state.searchText),
    );

    const isFiltered = this.state.searchText !== '';

    const qs = qsParse(this.props.location.search);
    const currentIcon = qs.icon
      ? icons.find((icon) => icon.name === qs.icon)
      : undefined;
    const activeIconId = currentIcon ? currentIcon.id : undefined;

    const introHeaderMarkup = isFiltered ? null : <IntroHeader />;

    const resultsMarkup =
      majorIcons.length || minorIcons.length ? (
        <>
          <IconsListing
            heading="Major Icons"
            icons={majorIcons}
            activeIconId={activeIconId}
            showCount={isFiltered}
          />
          <IconsListing
            heading="Minor Icons"
            icons={minorIcons}
            activeIconId={activeIconId}
            showCount={isFiltered}
          />
        </>
      ) : (
        <EmptyState />
      );

    return (
      <AppFrame onSearch={this.handleSearch}>
        <Seo title="Home" />
        <div className={styles.page}>
          <div className={styles.listing}>
            {introHeaderMarkup}
            {resultsMarkup}
          </div>
          <div className={styles.panel}>
            <div className={styles.panelFixed}>
              <IconDetailsPanel icon={currentIcon} />
            </div>
          </div>
        </div>
      </AppFrame>
    );
  }

  handleSearch(value) {
    this.setState({searchText: value});
  }
}

function filterIcons(icons, searchText) {
  const containsText = (string) =>
    string.toUpperCase().includes(searchText.toUpperCase());

  return icons.filter((icon) => {
    return containsText(icon.name) || icon.keywords.some(containsText);
  });
}

function buildIconSets(icons) {
  return icons.reduce(
    (memo, icon) => {
      if (icon.set === 'major') {
        memo[0].push(icon);
      } else if (icon.set === 'minor') {
        memo[1].push(icon);
      }

      return memo;
    },
    [[], []],
  );
}

export const pageQuery = graphql`
  query {
    allPolarisYaml {
      edges {
        node {
          date_added
          date_modified
          name
          id
          set
          descriptionHtml
          basename
          public
          keywords
          authors
          svgContent
          svgFile {
            publicURL
          }
        }
      }
    }
  }
`;
