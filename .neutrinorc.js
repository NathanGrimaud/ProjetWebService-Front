module.exports = {
  use: [
    ['neutrino-preset-web',{
      babel:{
        "presets": [
          "es2015"
        ],
        "plugins": [
          "syntax-jsx",
          ["transform-react-jsx", {"pragma": "html"}]
        ]
      }
    }],
    'neutrino-middleware-style-loader', // If it's not added by the preset you using 
  ]
};