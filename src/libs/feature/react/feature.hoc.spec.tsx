import { act, cleanup, render, screen } from '@testing-library/react';
import { type ReactNode } from 'react';
import {
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	test,
	vi,
} from 'vitest';
import { FeatureHandler, type FeatureLookup } from '../feature.handler.ts';
import { FeatureProvider } from './Feature.provider.tsx';
import { FeatureContextException } from './exceptions/feature-context.exception.ts';
import { withFeatures } from './feature.hoc.tsx';

const renderFeature = (component: ReactNode, features?: FeatureLookup) => {
	const handler = new FeatureHandler(features);

	return [
		handler,
		render(
			<FeatureProvider handler={handler}>{component}</FeatureProvider>,
		),
	] as const;
};

describe('feature HOC', () => {
	// hooks
	afterEach(() => {
		cleanup();
	});

	// tests

	test('when feature is not enabled, component is not rendered', () => {
		const Component = withFeatures({
			features: {
				FEATURE_V1: () => <span data-testid='id'>v1</span>,
			},
		});

		renderFeature(<Component />);
		const component = screen.queryByTestId('id');

		expect(component).toBeNull();
	});

	test('when feature is enabled, component is rendered', () => {
		const Component = withFeatures({
			features: {
				FEATURE_V1: () => <span data-testid='id'>v1</span>,
			},
		});

		const [handler] = renderFeature(<Component />);
		act(() => handler.set('FEATURE_V1', true));
		const component = screen.getByTestId('id');

		expect(component?.innerHTML).toBe('v1');
	});

	test('when more than one feature is enabled, render the first', () => {
		const Component = withFeatures({
			features: {
				FEATURE_V1: () => <span data-testid='id'>v1</span>,
				FEATURE_V2: () => <span data-testid='id2'>v2</span>,
			},
		});

		const [handler] = renderFeature(<Component />);
		act(() => {
			handler.set('FEATURE_V1', true);
			handler.set('FEATURE_V2', true);
		});
		const component1 = screen.getByTestId('id');
		const component2 = screen.queryByTestId('id2');

		expect(component1?.innerHTML).toBe('v1');
		expect(component2).toBeNull();
	});

	describe('throws', () => {
		// hooks
		beforeAll(() => {
			vi.spyOn(console, 'error').mockImplementation(() => null);
		});

		afterAll(() => {
			vi.clearAllMocks();
		});

		// tests
		test('FeatureContextException when no FeatureProvider found ', () => {
			const Component = withFeatures({ features: {} });
			// avoids stderror output

			const test = () => render(<Component />);

			expect(test).toThrow(FeatureContextException);
		});
	});
});
