module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'inline-dotenv', 
      [
        'module-resolver', 
        {
          "root": ["./src"],
          "extensions": [".js", ".jsx"],
          "alias": {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@styles": "./src/styles",
            "@utils": "./src/utils",
            "@views": "./src/views"
          }
        }
      ]
    ],
  };
};
