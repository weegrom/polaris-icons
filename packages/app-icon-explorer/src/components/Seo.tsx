import React from 'react';
import Helmet from 'react-helmet';
import {graphql, useStaticQuery} from 'gatsby';

interface Props {
  title: string;
  description?: string;
  lang?: string;
  meta?: any[];
  keywords?: string[];
}

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        titleTemplate
        description
        author
      }
    }
  }
`;

export default function Seo({
  title,
  description = '',
  lang = 'en',
  meta = [],
  keywords = [],
}: Props) {
  const data = useStaticQuery(detailsQuery);
  const metaDescription = description || data.site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      defaultTitle={data.site.siteMetadata.title}
      titleTemplate={data.site.siteMetadata.titleTemplate}
      link={[
        {
          rel: 'icon',
          type: 'image/png',
          href: require('../../static/images/shopify-favicon.png'),
        },
      ]}
      meta={[
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1',
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: data.site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : [],
        )
        .concat(meta)}
    />
  );
}
