import { act, renderHook } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { useAsyncStore } from './async.store.ts';
describe('async store', () => {
	// hooks
	beforeAll(() => {
		vi.useFakeTimers();
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	// tests
	test('initial state has "content" empty, and "loading" and "ready" false', () => {
		const { result } = renderHook(() => useAsyncStore());

		const state = result.current;

		expect(state.content).toStrictEqual({});
		expect(state.loading).toBe(false);
		expect(state.ready).toBe(false);
	});

	test('starts fetch changes "loading" to true', () => {
		const { rerender, result } = renderHook(() => useAsyncStore());

		// start fetch process
		act(() => {
			void result.current.fetch();
		});

		rerender();

		expect(result.current.loading).toBe(true);
		expect(result.current.ready).toBe(false);
		expect(result.current.content).toStrictEqual({});
	});

	test('once fetch is resolved, content has the value', async () => {
		const { rerender, result } = renderHook(() => useAsyncStore());

		// start fetch process
		act(() => {
			void result.current.fetch();
		});
		await vi.advanceTimersToNextTimerAsync();
		rerender();

		expect(result.current.loading).toBe(false);
		expect(result.current.ready).toBe(true);
		expect(result.current.content).toStrictEqual({ anyProp: 'anyValue' });
	});
});
