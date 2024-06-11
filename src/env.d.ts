type MODE = 'development' | 'production' | 'test';

/**
 * Global types definition for
 * environment variables.
 *
 * @remarks environment variables schema
 */
interface ImportMetaEnv {
	readonly APP_ENV: 'dev' | 'release';
	readonly MODE: MODE;
	readonly NODE_ENV: MODE;

	readonly DEV: 'false' | 'true';
	readonly PROD: 'false' | 'true';
	readonly SSR: 'false' | 'true';
	readonly VITEST: 'false' | 'true';

	// SECTION: base config
	readonly BASE_URL: string;
	readonly PORT: string;

	// SECTION: project info from package.json
	readonly APP_NAME: string;
	readonly APP_VERSION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
