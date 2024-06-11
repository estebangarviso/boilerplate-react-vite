import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Page } from './Page.tsx';

describe(Page, () => {
	// tests
	test('sets document title', () => {
		const title = 'page title';

		render(<Page title={title} />);

		expect(document.title).toBe(title);
	});

	test('render inner children', () => {
		const content = 'children content';

		render(
			<Page title=''>
				<h1>{content}</h1>
			</Page>,
		);
		const header = screen.getByRole('heading');

		expect(header.innerHTML).toBe(content);
	});
});
