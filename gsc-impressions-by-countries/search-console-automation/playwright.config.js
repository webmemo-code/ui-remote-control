module.exports = {
  timeout: 30000,
  use: {
    headless: false,
    ignoreDefaultArgs: ['--disable-extensions'],
    viewport: { width: 1280, height: 720 },
    acceptDownloads: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
};