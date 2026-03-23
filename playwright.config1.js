// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',

  //Below is for retrying failed test cases, we can also specify retries in individual test cases as well
  retries : 1,
  workers : 3,

  timeout: 40 * 1000, //default is 30 seconds in playwright
  expect: {
    timeout: 5000
  },

  projects: [
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure'//off,on,retain-on-failure
      },
    },

    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,


        screenshot: 'on',
        video :'retain-on-failure',
        trace: 'retain-on-failure',//off,on,retain-on-failure

        //use below for responsive web design
        //viewport : {width:720, height:720}

        //below is to run on mobile devices
        //...devices['Galaxy S24'],

        //below is for allowing SSL certificates error
        //ignoreHttpsErrors:true,

        //below for allowing location permissions in browser
        //permissions: ['geolocation'],
      },
    },

    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure'//off,on,retain-on-failure
      },
    }

  ],


  reporter: 'html'

});

module.exports = config

