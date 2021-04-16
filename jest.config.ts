import { pathsToModuleNameMapper } from 'ts-jest/utils'
import { compilerOptions } from './tsconfig.json'
const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })

export default {
  rootDir: './src',
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest',
  },
  moduleNameMapper,
}
