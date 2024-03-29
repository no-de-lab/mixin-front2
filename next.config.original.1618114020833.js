const webpack = require('webpack');

// next-plugins
const withPlugins = require('next-compose-plugins');
const withSourceMaps = require('@zeit/next-source-maps')();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // eslint-disable-next-line arrow-parens
  webpack: config => {
    config.resolve.modules.push(__dirname);

    const prod = process.env.NODE_ENV === 'production';

    config.module.rules.push({ // 웹팩설정에 로더 추가함
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    config.plugins.push(new webpack.IgnorePlugin(/(?:\/tests|__mocks)/));
    // moment locale size is too big
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(en)/),
    );

    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'inline-source-map' : 'eval',
    };
  },
};

module.exports = withPlugins([withSourceMaps, withBundleAnalyzer], nextConfig);
