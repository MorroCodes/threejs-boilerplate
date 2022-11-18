let mix = require('laravel-mix');

mix.js('src/js/app.js', 'dist').setPublicPath('dist');
mix.sass('src/scss/style.scss', 'dist');

mix.webpackConfig({
    module: {
      rules: [
        {
          test: /\.(glsl|frag|vert)$/,
          use: [
            'glslify-import-loader',
            'raw-loader',
            'glslify-loader',
          ],
        },
      ],
    },
  });
  
mix.disableNotifications();
