import React from 'react';
import {AppProvider, Frame, TopBar} from '@shopify/polaris';
import {ShortcutProvider, Shortcut} from '@shopify/react-shortcuts';
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
    topBarSource: require('../../../static/images/shopify-logo.svg'),
    url: '/',
    accessibilityLabel: 'Polaris Icons',
  },
};

interface Props {
  searchText: string;
  onSearchChange: (value: string) => void;
  onSearchBlur?: () => void;
  onSearchCancel?: () => void;
}

interface State {
  searchIsFocused: boolean;
}

export default class AppFrame extends React.Component<Props, State> {
  state = {
    searchIsFocused: false,
  };

  render() {
    const searchFieldMarkup = (
      <TopBar.SearchField
        focused={this.state.searchIsFocused}
        onChange={this.handleSearchChange}
        onBlur={this.handleSearchBlur}
        onCancel={this.handleSearchCancel}
        value={this.props.searchText}
        placeholder="Search"
      />
    );

    const topBarMarkup = <TopBar searchField={searchFieldMarkup} />;

    return (
      <AppProvider theme={theme}>
        <ShortcutProvider>
          <Shortcut ordered={['s']} onMatch={this.triggerSearchFocus} />
          <Frame topBar={topBarMarkup}>{this.props.children}</Frame>
        </ShortcutProvider>
      </AppProvider>
    );
  }

  handleSearchChange = (value: string) => {
    this.props.onSearchChange(value);
  };

  handleSearchBlur = () => {
    this.setState({searchIsFocused: false});
    if (this.props.onSearchBlur) {
      this.props.onSearchBlur();
    }
  };

  handleSearchCancel = () => {
    this.setState({searchIsFocused: false});
    if (this.props.onSearchCancel) {
      this.props.onSearchCancel();
    }
  };

  triggerSearchFocus = () => {
    this.setState({searchIsFocused: true});
  };
}
