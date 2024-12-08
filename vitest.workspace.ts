import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import { storybookNextJsPlugin } from '@storybook/experimental-nextjs-vite/vite-plugin'
import path from 'path'
import { defineConfig, defineWorkspace, mergeConfig } from 'vitest/config'

const sharedConfig = defineConfig({
  test: {
    setupFiles: ['./test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src'),
    },
  },
})

const storybookConfig = defineConfig({
  plugins: [storybookTest(), storybookNextJsPlugin()],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      name: 'chromium',
      provider: 'playwright',
    },
    environment: 'happy-dom',
    // Make sure to adjust this pattern to match your stories files.
    include: ['**/*.stories.?(m)[jt]s?(x)'],
    setupFiles: ['./.storybook/vitest.setup.ts'],
  },
})

const defaultConfig = defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['./src/**/*.test.?(m)[jt]s?(x)'],
  },
})

export default defineWorkspace([
  mergeConfig(sharedConfig, storybookConfig),
  mergeConfig(sharedConfig, defaultConfig),
])
