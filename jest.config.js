module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',

  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['/node_modules/', '\\.pnp\\.[^\\/]+$', '\\.svg$', '\\.s?css$'],
  moduleNameMapper: { '\\.svg$': 'identity-obj-proxy', '\\.scss$': 'identity-obj-proxy', '\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4)$': '<rootDir>/path-to-fileMock.js' },
};
