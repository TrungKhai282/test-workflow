import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { dependencies } from './package.json';

export default defineConfig({
  server: {
    port: 3102,
  },
  moduleFederation: {
    options: {
      name: 'workflow_remote_module',
      exposes: {
        './App': './src/App',
      },
      filename: 'remoteEntry.js',
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies['react'],
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
      },
    },
  },
  plugins: [pluginReact(), pluginSass()],
});
