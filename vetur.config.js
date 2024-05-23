// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  // **optional** default: `{}`
  // override vscode settings
  // Notice: It only affects the settings used by Vetur.
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true
  },
  // **optional** default: `[{ root: './' }]`
  // support monorepos
  projects: [{ root: './' }],
  // Options for configuring the vue compiler
  vueCompilerOptions: {
    // Enable transpilation of ES2015+ features to ES5
    preserveWhitespace: false,
    // Enable source map generation for vue templates
    sourceMaps: true,
    // Support Pug templates with TypeScript IntelliSense
    plugins: [require('@vue/language-plugin-pug')]
  }
}
