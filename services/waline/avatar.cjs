const { createHash } = require('node:crypto');

// Waline's default template throws on anonymous comments with a null email.
// Keep its avatar sources, while supporting both new and already stored comments.
module.exports = function avatarUrl({ nick, mail } = {}) {
  const nickname = typeof nick === 'string' ? nick : '';
  const email = typeof mail === 'string' ? mail.trim().toLowerCase() : '';
  if (/^[0-9]+$/.test(nickname)) {
    return `https://q1.qlogo.cn/g?b=qq&nk=${nickname}&s=100`;
  }
  if (/^[0-9]+@qq\.com$/.test(email)) {
    return `https://q1.qlogo.cn/g?b=qq&nk=${email.slice(0, -7)}&s=100`;
  }
  return `https://seccdn.libravatar.org/avatar/${createHash('md5').update(email).digest('hex')}`;
};
