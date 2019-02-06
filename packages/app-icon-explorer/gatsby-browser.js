/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

function isIndex(path) {
  return path === '/' || path === '/index.html';
}

exports.shouldUpdateScroll = ({prevRouterProps, routerProps}) => {
  // Showing an icon preview should not reset the scroll location of the whole page
  if (
    isIndex(prevRouterProps.location.pathname) &&
    isIndex(routerProps.location.pathname)
  ) {
    return false;
  }

  return true;
};
