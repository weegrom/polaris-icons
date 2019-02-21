module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-typescript'],
      ['babel-preset-shopify/web', {modules: false}],
      ['babel-preset-shopify/react'],
    ],
  };
};
