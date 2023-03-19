// https://archive.jestjs.io/docs/ja/22.x/configuration

module.exports = {
  moduleFileExtensions: [
    "js",
    "json",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  setupFiles: ["<rootDir>/test/setup"],
}
