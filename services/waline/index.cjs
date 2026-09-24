const Waline = require('@waline/vercel');

const handler = Waline({
  avatarUrl: require('./avatar.cjs'),
  secureDomains: [
    'starrydome.top',
    'comments.starrydome.top',
    'www.starrydome.top',
    'isilalphare.github.io',
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL ? [process.env.VERCEL_PROJECT_PRODUCTION_URL] : []),
    ...(process.env.VERCEL_URL ? [process.env.VERCEL_URL] : []),
  ],
});

// The SQL adapter logs connection strings at info level; keep production logs
// to warnings/errors instead of exposing credentials and full comment payloads.
global.think.logger.getLogger().level = 'warn';
module.exports = handler;
