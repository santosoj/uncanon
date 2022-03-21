const path = require('path')

const { withUnimodules } = require('@expo/webpack-config/addons')

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.tsx',
    '../screens/**/*.stories.tsx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    return withUnimodules(
      config,
      {
        projectRoot: path.resolve(__dirname, '../'),
        babel: {
          dangerouslyAddModulePathsToTranspile: ['@ui-kitten/components'],
        },
      },
      {
        expoConfig: {
          web: {
            build: {
              babel: {
                use: {
                  options: {
                    babelrc: false,
                    configFile: true,
                  },
                },
              },
            },
          },
        },
      }
    )
  },
}
