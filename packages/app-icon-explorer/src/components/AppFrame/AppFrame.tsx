import React from 'react';
import {
  AppProvider,
  Frame,
  TopBar,
  Button,
  ButtonGroup,
} from '@shopify/polaris';
import '@shopify/polaris/styles.scss';
import styles from './AppFrame.module.scss';

const theme = {
  colors: {
    topBar: {
      background: '#ffffff',
      backgroundDarker: '#ffffff',
      backgroundLighter: '#F4F6F8',
      color: '#919EAB',
    },
  },
  logo: {
    width: 104,
    topBarSource: '/images/shopify-logo.svg',
    url: '/',
    accessibilityLabel: 'Polaris Icons',
  },
};

interface Props {
  onSearch: (value: string) => void;
}

export default class AppFrame extends React.Component<Props> {
  state = {
    searchText: '',
  };

  render() {
    const searchFieldMarkup = (
      <TopBar.SearchField
        onChange={this.handleSearchChange}
        value={this.state.searchText}
        placeholder="Search"
      />
    );

    const userMenuMarkup = (
      <div className={styles.moreActions}>
        <ButtonGroup>
          <Button url="https://github.com/shopify/polaris-icons">
            Submit icon
          </Button>
          <Button primary url="https://github.com/shopify/polaris-icons">
            Request icon
          </Button>
        </ButtonGroup>
      </div>
    );

    const topBarMarkup = (
      <TopBar
        showNavigationToggle
        searchField={searchFieldMarkup}
        userMenu={userMenuMarkup}
        onSearchResultsDismiss={this.handleSearchResultsDismiss}
      />
    );

    return (
      <AppProvider theme={theme}>
        <Frame topBar={topBarMarkup}>{this.props.children}</Frame>
      </AppProvider>
    );
  }

  handleSearchResultsDismiss = () => {
    this.setState({searchText: ''});
    this.props.onSearch('');
  };

  handleSearchChange = (value) => {
    this.setState({searchText: value});
    this.props.onSearch(value);
  };
}
