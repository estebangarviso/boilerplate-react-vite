import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, test } from 'vitest';
import { createRouter } from '#libs/router';
import { routes } from '../app/app.routes.tsx';

describe('App', () => {
	const env = import.meta.env.APP_ENV;

	// hooks
	beforeAll(async () => {
		const AppRouter = createRouter({
			routes: routes.app,
			type: 'memory',
		});

		render(<AppRouter />);

		// waits for lazy loading
		await screen.findByText('Go To Detail');
	});

	// tests
	test('has header (banner role) with content "App"', () => {
		const header = screen.getByRole('banner');

		expect(header.innerHTML).toBe('App');
	});

	test('has footer (contentinfo role) with content "Footer"', () => {
		const footer = screen.getByRole('contentinfo');

		expect(footer.innerHTML).toBe('Footer');
	});

	test('navigates to detail page', async () => {
		const anchor = screen.getByRole('link', { name: 'Go To Detail' });
		anchor.click();

		const asyncMessage = await screen.findByText(env);

		expect(asyncMessage.tagName).toBe('H2');
	});
});
