/* eslint-disable line-comment-position, camelcase */
const {dirname} = require('path');
const resolve = require('resolve');

const iconsPath = dirname(
  resolve.sync(
    '@shopify/polaris-icons-raw/icons/polaris/add_major_monotone.yml',
  ),
);

module.exports = {
  siteMetadata: {
    title: `Polaris icons (beta)`,
    description: `A cohesive collection of icons that we use across the Shopify platform.`,
    author: `Shopify`,
    titleTemplate: `Polaris icons (beta)`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-icons`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: iconsPath,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/images/shopify-favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: 'UA-49178120-32',
        head: true,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
