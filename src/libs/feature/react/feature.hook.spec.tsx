import { type RenderOptions, act, renderHook } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { FeatureHandler } from '../feature.handler.ts';
import { FeatureProvider } from './Feature.provider.tsx';
import { FeatureContextException } from './exceptions/feature-context.exception.ts';
import { useFeature, useFeatureHandler } from './feature.hook.ts';

describe('feature hooks', () => {
	const _handler = new FeatureHandler();
	const wrapper: RenderOptions['wrapper'] = ({ children }) => (
		<FeatureProvider handler={_handler}>{children}</FeatureProvider>
	);

	// hooks
	beforeAll(() => {
		vi.spyOn(console, 'error').mockImplementation(() => null);
	});

	afterAll(() => {
		vi.clearAllMocks();
	});

	// tests
	describe('useFeatureHandler', () => {
		test('when no FeatureProvider found, throws FeatureContextException', () => {
			const test = () => renderHook(useFeatureHandler);

			expect(test).toThrow(FeatureContextException);
		});

		test('returns FeatureHandler', () => {
			const { result } = renderHook(useFeatureHandler, { wrapper });

			expect(result.current).toBe(_handler);
		});
	});

	describe('useFeature', () => {
		test('returns feature value', () => {
			const feature = 'FEATURE';
			const { result } = renderHook(() => useFeature(feature), {
				wrapper,
			});

			// using FeatureHandler
			act(() => _handler.set(feature, true));
			const [value, setValue] = result.current;

			// using set fn
			act(() => setValue(false));
			const [newValue] = result.current;

			expect(value).toBe(true);
			expect(newValue).toBe(false);
		});
	});
});
