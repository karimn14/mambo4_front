module.exports = {
    devServer: {
      proxy: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          },
        '/api': {
          target: 'localhost:8000',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  };  