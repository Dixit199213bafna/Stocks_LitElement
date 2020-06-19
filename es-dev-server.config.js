const proxy = require('koa-proxies');

module.exports = {
  port: 9000,
  middlewares: [
    proxy('/api', {
      target: 'https://services.ing.nl',
      secure: false,
      changeOrigin: true,
    }),
  ],
};
