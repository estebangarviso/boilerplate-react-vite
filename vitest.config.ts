import { defineConfig, mergeConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import viteConfig from './vite.config.ts';

export default mergeConfig(
	viteConfig,
	defineConfig({
		clearScreen: false,
		plugins: [
			checker({
				terminal: true,
				typescript: true,
			}),
		],
		test: {
			coverage: {
				exclude: [
					'**/*.{d,config,mock,fixture,interface,bench}.{ts,cts,mts,tsx}',
					'**/{index,main}.{ts,cts,mts,tsx}',
					'**/__{tests,mocks,fixtures}__',
				],
				include: ['src/**/*.{ts,cts,mts,tsx}'],
				reporter: ['text', 'text-summary', 'lcov', 'cobertura', 'json'],
				reportsDirectory: '.reports/coverage',
			},
			environment: 'jsdom',
			globals: true,
			include: ['src/**/*.{spec,test}.{ts,cts,mts,tsx}'],
			reporters: ['verbose'],
			setupFiles: [
				'@testing-library/react/dont-cleanup-after-each',
				'./vitest.setup.ts',
			],
		},
	}),
);
