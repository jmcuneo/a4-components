// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
     src: '/',
     dist: '/dist'
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: 'dist',
    metaUrlPath: 'snowpack'
  },
  optimize: {
    bundle: true,
    minify: true
  }
};
