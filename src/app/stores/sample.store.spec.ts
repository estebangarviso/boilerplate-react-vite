import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useSampleStore } from './sample.store.ts';

describe('sample store', () => {
	// tests
	test('initial state returns "loading"', () => {
		const { result } = renderHook(() => useSampleStore());
		const expected = 'loading';

		const state = result.current.message;

		expect(state).toBe(expected);
	});

	test('dispatch a status 200 returns "success"', () => {
		const { rerender, result } = renderHook(() => useSampleStore());
		const expected = 'success';

		// dispatch a status 200
		act(() => {
			result.current.setStatus(200);
		});
		rerender();

		const state = result.current.message;
		expect(state).toBe(expected);
	});

	test('dispatch a status different from 200 returns "error"', () => {
		const { rerender, result } = renderHook(() => useSampleStore());
		const expected = 'error';

		// dispatch a status 500
		act(() => {
			result.current.setStatus(500);
		});
		rerender();

		const state = result.current.message;
		expect(state).toBe(expected);
	});
});
