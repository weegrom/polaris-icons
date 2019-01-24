import React from 'react';
import icons from '@shopify/polaris-icons';
import {AppProvider, Page, Icon} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

function App() {
  const iconList = Object.keys(icons);
  return (
    <AppProvider>
      <Page title="Polaris Icons">
        <ul>{iconList.map(PreviewIcon)}</ul>
      </Page>
    </AppProvider>
  );
}

function PreviewIcon(iconName) {
  return (
    <div>
      {iconName}{' '}
      <span style={{display: 'inline-block'}}>
        <Icon source={icons[iconName]} />
      </span>
    </div>
  );
}

export default App;
