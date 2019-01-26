import {Link} from 'gatsby';

import React from 'react';

interface Props {
  siteTitle: string;
}

export default function Header({siteTitle = ''}: Props) {
  return (
    <div>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
    </div>
  );
}
