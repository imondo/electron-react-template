const path = require('path');
const { paths } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const updateConfig = {
  entryConfig: path.resolve(__dirname, 'src/renderer/index.js'),
  renderDir: path.resolve(__dirname, 'src/renderer'),
  copyMain: {
    from: path.resolve(__dirname, 'src/main'),
    to: path.resolve(__dirname, 'build/main'),
  }
}

const updateReactEntryPath = (config, filename, renderDir) => {
  const originalPaths = require.cache[
    require.resolve(`${paths.scriptVersion}/config/paths.js`)
  ];

  Object.assign(originalPaths.exports, {
    appIndexJs: filename,
    appSrc: renderDir
  });

  const entry = [
    ...config.entry.slice(0, config.entry.length - 1),
    filename
  ];

  return entry;
}

module.exports = {
  webpack: function(config, env) {
    config = rewireLess(config, env);  
    config.entry = updateReactEntryPath(config, updateConfig.entryConfig, updateConfig.renderDir);

    let { from, to } = updateConfig.copyMain;
    config.plugins.push(new CopyWebpackPlugin([
      {
        from,
        to,
        ignore: ['.*']
      }
    ]));
    config.target = 'electron-renderer';
    return config;
  },
}