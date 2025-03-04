/**
 * Copyright 2020 Inrupt Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

module.exports = {
  // In CI, we can use 100% of the available resources:
  maxWorkers: process.env.CI ? "100%" : "50%",

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The test environment that will be used for testing
  testEnvironment: "<rootDir>/customEnvironment.js",

  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],

  testPathIgnorePatterns: ["/node_modules/", "/__testUtils/", "/.next"],

  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.ttl$": "jest-raw-loader",
  },

  // Coverage configs
  collectCoverage: true,
  coverageReporters: process.env.CI ? ["text", "lcov"] : ["text"],

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/__testUtils/",
    "/src/windowHelpers",
  ],

  coverageThreshold: {
    global: {
      branches: 89,
      functions: 90,
      lines: 95,
      statements: 95,
    },
  },
};
