const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
      project: {
            android: {
              packageName: 'com.movies',
            },
      },
      resolver: {
            assetExts: [...getDefaultConfig().resolver.assetExts, 'lottie'],
      },
      plugins: [
            'react-native-reanimated/plugin',
      ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
