const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');

const langs = [];
fs.readdirSync('./node_modules/node-blockly/lib/i18n').forEach(file => {
  langs.push(path.parse(file).name)
});

langs_name = {
  "ar": "العربية",
  "be-tarask": "Taraškievica",
  "br": "Brezhoneg",
  "ca": "Català",
  "cs": "Česky",
  "da": "Dansk",
  "de": "Deutsch",
  "el": "Ελληνικά",
  "en": "English",
  "es": "Español",
  "et": "Eesti",
  "fa": "فارسی",
  "fr": "Français",
  "he": "עברית",
  "hrx": "Hunsrik",
  "hu": "Magyar",
  "ia": "Interlingua",
  "is": "Íslenska",
  "it": "Italiano",
  "ja": "日本語",
  "kab": "Kabyle",
  "ko": "한국어",
  "mk": "Македонски",
  "ms": "Bahasa Melayu",
  "nb": "Norsk Bokmål",
  "nl": "Nederlands, Vlaams",
  "oc": "Lenga d'òc",
  "pl": "Polski",
  "pms": "Piemontèis",
  "pt-br": "Português Brasileiro",
  "ro": "Română",
  "ru": "Русский",
  "sc": "Sardu",
  "sk": "Slovenčina",
  "sr": "Српски",
  "sv": "Svenska",
  "ta": "தமிழ்",
  "th": "ภาษาไทย",
  "tlh": "tlhIngan Hol",
  "tr": "Türkçe",
  "uk": "Українська",
  "vi": "Tiếng Việt",
  "zh-hans": "简体中文",
  "zh-hant": "正體中文"
};

module.exports = {
  entry: {
    index: "./index.js",
  },
  output: {
    path: __dirname,
    filename: "[name].build.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/index.tpl.html`,
      templateParameters: {
        langs: langs,
        langs_name: langs_name,
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
  ],
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'eval',
};