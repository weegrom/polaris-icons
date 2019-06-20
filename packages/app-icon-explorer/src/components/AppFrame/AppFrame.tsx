import React, {useState, useCallback} from 'react';
import {AppProvider, Frame, TopBar, UnstyledLinkProps} from '@shopify/polaris';
import {
  colorSkyLight,
  colorInkLightest,
  colorWhite,
} from '@shopify/polaris-tokens';
import {ShortcutProvider, Shortcut} from '@shopify/react-shortcuts';
import {Link as InternalLink} from 'gatsby';
import {OutboundLink} from 'gatsby-plugin-google-gtag';

import {QueryParamsContext, IQueryParamsContext} from './context';
import '@shopify/polaris/styles.scss';
import './polaris-overrides.scss';

const theme = {
  colors: {
    topBar: {
      background: colorWhite,
      backgroundDarker: colorWhite,
      backgroundLighter: colorSkyLight,
      color: colorInkLightest,
    },
  },
  logo: {
    width: 104,
    topBarSource: require('../../../static/images/shopify-logo.svg'),
    url: '/',
    accessibilityLabel: 'Polaris icons',
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

export default function AppFrame({
  queryParams,
  searchText,
  onSearchChange,
  onSearchBlur,
  onSearchCancel,
  children,
}: Props) {
  const [searchIsFocused, setSearchIsFocused] = useState(false);

  const handleSearchChange = useCallback(
    (value: string) => {
      onSearchChange(value);
    },
    [onSearchChange],
  );

  const handleSearchBlur = useCallback(() => {
    setSearchIsFocused(false);
    if (onSearchBlur) {
      onSearchBlur();
    }
  }, [onSearchBlur]);

  const handleSearchCancel = useCallback(() => {
    if (onSearchCancel) {
      onSearchCancel();
    }
  }, [onSearchCancel]);

  const triggerSearchFocus = useCallback(() => {
    setSearchIsFocused(true);
  }, [setSearchIsFocused]);

  const searchFieldMarkup = (
    <TopBar.SearchField
      focused={searchIsFocused}
      onChange={handleSearchChange}
      onBlur={handleSearchBlur}
      onCancel={handleSearchCancel}
      value={searchText}
      placeholder="Search icons"
    />
  );

  const topBarMarkup = <TopBar searchField={searchFieldMarkup} />;

  return (
    <QueryParamsContext.Provider value={queryParams}>
      <AppProvider theme={theme} linkComponent={Link}>
        <ShortcutProvider>
          <Shortcut ordered={['s']} onMatch={triggerSearchFocus} />
          <Frame topBar={topBarMarkup}>{children}</Frame>
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
