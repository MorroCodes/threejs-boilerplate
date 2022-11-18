let mix = require('laravel-mix');

mix.js('src/js/app.js', 'dist').setPublicPath('dist');
mix.sass('src/scss/style.scss', 'dist');
mix.disableNotifications();
