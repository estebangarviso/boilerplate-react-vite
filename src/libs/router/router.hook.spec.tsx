import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { useDocumentTitle, useHashValue } from './router.hook.ts';

describe('router hooks', () => {
	// tests
	test('useDocumentTitle changes document title', () => {
		const title = 'my title';

		const titleBefore = document.title;
		renderHook(() => useDocumentTitle(title));
		const titleAfter = document.title;

		expect(titleBefore).not.toBe(titleAfter);
		expect(titleAfter).toBe(title);
	});

	test('useHashValue returns current path hash', () => {
		const expected = 'myHash';

		const { result } = renderHook(useHashValue, {
			wrapper: ({ children }) => (
				<MemoryRouter initialEntries={[`/path#${expected}`]}>
					{children}
				</MemoryRouter>
			),
		});

		expect(result.current).toBe(expected);
	});
});
