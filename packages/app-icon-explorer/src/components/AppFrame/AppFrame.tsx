import React from 'react';
import {AppProvider, Frame, TopBar} from '@shopify/polaris';
import '@shopify/polaris/styles.scss';
import styles from './AppFrame.module.scss';

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
  onSearch: (value: string) => void;
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

    const userMenuMarkup = (
      <div className={styles.moreActions}>
        {/* <ButtonGroup>
          <Button url="https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=New&template=request-a-new-icon.md&title=%5BRequest%5Dhttps://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=New&template=request-a-new-icon.md&title=%5BRequest%5D">
            Request icon
          </Button>
          <Button url="https://github.com/Shopify/polaris-icons/issues/new?assignees=&labels=New&template=submit-a-new-icon.md&title=%5BSubmission%5D">
            Submit icon
          </Button>
        </ButtonGroup> */}
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
