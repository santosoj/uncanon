const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          '@ui-kitten/components',
          'uncanon-types',
        ],
      },
    },
    argv
  )

  config.module.rules.push({
    test: /\.graphql$/,
    use: 'raw-loader',
  })

  config.watchOptions = {
    ignored: [/node_modules/],
  }

  return config
}
