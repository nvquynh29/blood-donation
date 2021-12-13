const path = require('path')
module.exports = {
  trailingSlash: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    API_URL: 'http://localhost:5000',
    MODE: 'DEV',
  },
  // experimental: {
  //   urlImports: [
  //     'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.6.2/chart.min.js',
  //   ],
  // },
}
