module.exports = {
    preset: 'jest-preset-angular',
    roots: ['src'],
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    coverageDirectory: './coverage',
    collectCoverageFrom: ['src/app/**/*.ts', '!<rootDir>/node_modules/', '!<rootDir>/test/'],
    coverageThreshold: {
        global: {
            lines: 80,
            statements: 80,
        },
    },
    moduleNameMapper: {
        '@common/(.*)': '<rootDir>/src/app/common/$1',
        '@pages/(.*)': '<rootDir>/src/app/pages/$1',
        '@env': '<rootDir>/src/environments/environment',
    },
};
