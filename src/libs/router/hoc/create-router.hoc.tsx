import { Suspense } from 'react';
import {
	RouterProvider,
	createBrowserRouter,
	createHashRouter,
	createMemoryRouter,
} from 'react-router-dom';
import type { RouteDefinition } from '../types/route.d.ts';
import { createRoutes } from './create-routes.tsx';

/**
 * Create router lookup.
 */
const getRouterFactory = {
	browser: createBrowserRouter,
	hash: createHashRouter,
	memory: createMemoryRouter,
};

/**
 * Creates a routes rendering
 * using React Router.
 *
 * You can create multiple routers for
 * different routes contexts, i.e. public
 * and private routes.
 *
 * @example
 * ```ts
 *  // routes definition
 *	import { lazy } from 'react';
 *	import MyEagerPage from '@pages/MyEagerPage.page';
 *
 *	export const myRoutes = [
 *		...,
 *		{	// when not specified, by default '/' path
 *			Layout: AppLayout, // a layout wraps its children
 *			children: [
 *				{
 *					Component: lazy(() => import('./pages/main/Main.page')),
 *					..., // any React Router route config
 *				},
 *				{
 *					path: 'detail/:id?',
 *					Component: lazy(() => import('./pages/detail/Detail.page')),
 *				},
 *			],
 *		},
 *	];
 *```
 * @example
 * ```ts
 *  // use this HOC as
 *	import { createRouter } from '@router';
 *	import { myRoutes } from '...';
 *
 *	const Router = createRouter({
 *		routes: myRoutes,
 *		loader: <h1>Loading</h1>,
 *		fallback: <h1>Not Found</h1>
 *	});
 *
 *	export const AppRouter: React.FC = (): React.ReactElement => {
 *		// authorization or any other logic
 *
 *		return <Router />;
 *	};
 *```
 *
 * @param config - router config
 *
 * @returns router with routes preloaded
 */
export const createRouter = ({
	fallback,
	loading,
	options,
	routes: routesDef,
	type = 'browser',
}: MemoryRouterConfig | RouterConfig): React.FC => {
	const routes = createRoutes(routesDef);

	const create = getRouterFactory[type];
	const router = create(routes, options);

	return (): React.ReactElement => (
		<Suspense fallback={loading}>
			<RouterProvider fallbackElement={fallback} router={router} />
		</Suspense>
	);
};

interface RouterOptions {
	basename?: string;
	window?: Window;
}

interface MemoryRouterOptions {
	basename?: string;
	initialEntries?: string[];
	initialIndex?: number;
}

export interface RouterConfigBase {
	fallback?: React.ReactNode;
	loading?: React.ReactNode;
	routes: RouteDefinition[];
}

export interface RouterConfig extends RouterConfigBase {
	options?: RouterOptions;
	type?: 'browser' | 'hash';
}

export interface MemoryRouterConfig extends RouterConfigBase {
	options?: MemoryRouterOptions;
	type?: 'memory';
}
