import { type RenderHookResult } from '@testing-library/react';

export declare global {
	type RenderHook<
		Render extends (...args: any[]) => any,
		Props extends any[] = Parameters<Render>,
		Result = ReturnType<Render>,
	> = RenderHookResult<Result, Props[0]>;
}
