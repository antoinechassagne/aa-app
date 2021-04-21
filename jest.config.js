module.exports = {
  verbose: true,
  forceExit: true,
  transform: {
    "^.+\\.js?$": require.resolve("babel-jest"),
  },
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/client/src/$1",
  },
};
