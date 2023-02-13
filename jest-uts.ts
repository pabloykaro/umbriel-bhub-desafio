import { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],

  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },

  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  testRegex: ".*\\.uts.spec\\.ts$",

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};

export default config;
