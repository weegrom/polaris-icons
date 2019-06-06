import React, {useState} from 'react';
import {AppProvider, Frame, TopBar, UnstyledLinkProps} from '@shopify/polaris';
import {ShortcutProvider, Shortcut} from '@shopify/react-shortcuts';
import {Link as InternalLink} from 'gatsby';
import {OutboundLink} from 'gatsby-plugin-google-gtag';

import {QueryParamsContext, IQueryParamsContext} from './context';
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
  queryParams: IQueryParamsContext;
  searchText: string;
  onSearchChange: (value: string) => void;
  onSearchBlur?: () => void;
  onSearchCancel?: () => void;
  children?: React.ReactNode;
}

export default function AppFrame(props: Props) {
  const [searchIsFocused, setSearchIsFocused] = useState(false);

  function handleSearchChange(value: string) {
    props.onSearchChange(value);
  }

  function handleSearchBlur() {
    setSearchIsFocused(false);
    if (props.onSearchBlur) {
      props.onSearchBlur();
    }
  }

  function handleSearchCancel() {
    if (props.onSearchCancel) {
      props.onSearchCancel();
    }
  }

  function triggerSearchFocus() {
    setSearchIsFocused(true);
  }

  const searchFieldMarkup = (
    <TopBar.SearchField
      focused={searchIsFocused}
      onChange={handleSearchChange}
      onBlur={handleSearchBlur}
      onCancel={handleSearchCancel}
      value={props.searchText}
      placeholder="Search"
    />
  );

  const topBarMarkup = <TopBar searchField={searchFieldMarkup} />;

  return (
    <QueryParamsContext.Provider value={props.queryParams}>
      <AppProvider theme={theme} linkComponent={Link}>
        <ShortcutProvider>
          <Shortcut ordered={['s']} onMatch={triggerSearchFocus} />
          <Frame topBar={topBarMarkup}>{props.children}</Frame>
        </ShortcutProvider>
      </AppProvider>
    </QueryParamsContext.Provider>
  );
}

function Link({children, url = '', ...rest}: UnstyledLinkProps) {
  // Downloadable links shouldn't use OutboundLink as OutboundLink always forces
  // a page navigation, which we don't want
  if (rest.download) {
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return isOutboundLink(url) ? (
    <OutboundLink href={url} {...rest as any}>
      {children}
    </OutboundLink>
  ) : (
    <InternalLink to={url} {...rest as any}>
      {children}
    </InternalLink>
  );
}

function isOutboundLink(url: string) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/)/.test(url);
}
