module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      // Reanimated must stay last so worklets are compiled for the UI thread.
      'react-native-reanimated/plugin',
    ],
  };
};
