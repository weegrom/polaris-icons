import React from 'react';

import {AppFrame, Seo} from '../components';

export default function NotFoundPage() {
  const handleSearchChange = (_: string) => {};

  return (
    <AppFrame
      queryParams={{}}
      searchText=""
      onSearchChange={handleSearchChange}
    >
      <Seo title="404: Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </AppFrame>
  );
}
