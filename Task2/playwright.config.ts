import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120_000,
  expect: { timeout: 15_000 },
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    headless: false,
    viewport: { width: 1366, height: 768 },
    locale: 'en-US',
    video: 'on',
    trace: 'retain-on-failure',
    launchOptions: {
      slowMo: 700,
      args: ['--disable-blink-features=AutomationControlled'],
      ignoreDefaultArgs: ['--enable-automation'],
    },
  },
  projects: [
    { name: 'Google Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],
});