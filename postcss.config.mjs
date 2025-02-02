/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    'tailwindcss',
    [
      '@csstools/postcss-global-data',
      {
        files: ['./src/styles/custom_media.css'],
      },
    ],
    'postcss-nesting',
    'postcss-custom-media',
  ],
}

export default config
