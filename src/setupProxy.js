const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
    target: 'http://localhost:2000',
    changeOrigin: true
}
const proxy2 = {
    target: 'https://api.nytimes.com',
    changeOrigin: true,
}
module.exports = function (app) {

    app.use(
        '/login',
        createProxyMiddleware(proxy)
    );

    app.use(
        '/api',
        createProxyMiddleware(proxy2)
    );
};