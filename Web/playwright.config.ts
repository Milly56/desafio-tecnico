import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: 1,

  reporter: [
    ['html', { outputFolder: 'docs', open: 'never' }],
  ],

  use: {
    baseURL: 'https://www.phoebus.com.br',

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'off',
  },

  projects: [
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: {
          args: ['--width=1024', '--height=700'],
        },
      },
    },

  ],

});