// skip Husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(0);
}
// eslint-disable-next-line unicorn/no-await-expression-member
const husky = (await import('husky')).default;
// eslint-disable-next-line no-console
console.log(husky());
