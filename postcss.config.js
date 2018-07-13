module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 2 version', 'safari 5', 'ie 9', 'opera 11', 'ios 6', 'android 4', 'firefox 14']
        })
    ]
  }