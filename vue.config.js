module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/menu': {
        target: 'http://127.0.0.1:8000',
        ws: true
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
