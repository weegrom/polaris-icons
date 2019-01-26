import React from 'react';
import {StaticQuery, graphql} from 'gatsby';

import Header from './header';
import '@shopify/polaris/styles.scss';
import styles from './layout.module.scss';

interface Props {
  children: any;
}

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default function Layout({children}: Props) {
  return (
    <StaticQuery
      query={query}
      // eslint-disable-next-line react/jsx-no-bind
      render={(data) => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div className={styles.Container}>{children}</div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              if (window.netlifyIdentity) {
                window.netlifyIdentity.on("init", user => {
                  if (!user) {
                    window.netlifyIdentity.on("login", () => {
                      document.location.href = "/admin/";
                    });
                  }
                });
              }
            `,
            }}
          />
        </>
      )}
    />
  );
}
