import React from 'react';
import {AppProvider, Frame, TopBar} from '@shopify/polaris';
import '@shopify/polaris/styles.scss';
import './polaris-overrides.scss';

const theme = {
  colors: {
    topBar: {
      background: '#ffffff',
      backgroundDarker: '#fff',
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
  onSearch?: (value: string) => void;
}

interface State {
  searchText: string;
}

export default class AppFrame extends React.Component<Props, State> {
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

    const topBarMarkup = (
      <TopBar
        showNavigationToggle
        searchField={searchFieldMarkup}
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

    if (this.props.onSearch) {
      this.props.onSearch('');
    }
  };

  handleSearchChange = (value: string) => {
    this.setState({searchText: value});

    if (this.props.onSearch) {
      this.props.onSearch(value);
    }
  };
}
