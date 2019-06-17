import React from 'react';
import {EmptyState, Page, AppProvider, Link} from '@shopify/polaris';
import {Seo} from '../components';

import {NotFound} from '../illustrations';

export default function NotFoundPage() {
  return (
    <AppProvider>
      <>
        <Seo title="404: Not found" />
        <Page title="">
          <EmptyState
            heading="There’s no page at this address"
            image={NotFound}
          >
            <p>
              Check the URL and try again,
              {''}
              <br />
              or <Link url="/">go to the home page</Link>.
            </p>
          </EmptyState>
        </Page>
      </>
    </AppProvider>
  );
}
