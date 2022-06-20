export default {
  roots: ["<rootDir>/tests/"],
  coverageProvider: "v8",
  transform: {},

  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "ts"
  ],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
};
