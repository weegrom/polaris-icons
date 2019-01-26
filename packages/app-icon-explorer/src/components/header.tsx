import {Link} from 'gatsby';

import React from 'react';

interface Props {
  siteTitle: string;
}

const Header = ({siteTitle = ''}: Props) => (
  <div>
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
  </div>
);

export default Header;
