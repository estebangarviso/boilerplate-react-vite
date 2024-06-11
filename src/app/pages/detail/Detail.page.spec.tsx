import { act, render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, test, vi } from 'vitest';
import { FeatureHandler, FeatureProvider } from '#libs/feature';
import { createRouter } from '#libs/router';
import { DetailPage } from './Detail.page.tsx';

describe(DetailPage, () => {
	// hooks
	beforeAll(() => {
		vi.useFakeTimers();

		const DetailPageRouter = createRouter({
			routes: [{ Component: DetailPage }],
			type: 'memory',
		});

		const features = new FeatureHandler({
			FEATURE_FETCHBOX_V2ALPHA: true,
		});

		render(
			<FeatureProvider handler={features}>
				<DetailPageRouter />
			</FeatureProvider>,
		);
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	// tests
	test('fetch data clicking button', async () => {
		const button = screen.getByRole('button', { name: 'Fetch' });

		await act(async () => {
			button.click();
			await vi.advanceTimersToNextTimerAsync();
		});

		screen.getByRole('heading', { name: 'anyValue' });
	});
});
