const Waline = require('@waline/vercel');

module.exports = Waline({
  avatarUrl: require('./avatar.cjs'),
  secureDomains: [
    'starrydome.top',
    'www.starrydome.top',
    'isilalphare.github.io',
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL ? [process.env.VERCEL_PROJECT_PRODUCTION_URL] : []),
    ...(process.env.VERCEL_URL ? [process.env.VERCEL_URL] : []),
  ],
});
