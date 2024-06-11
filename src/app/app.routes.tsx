import { type RouteDefinition } from '#libs/router';
import { AppLayout } from './layouts/app/App.layout.tsx';
import MainPage from './pages/main/Main.page.tsx';

/**
 * Routes definition.
 *
 * Here you must define your app routes
 * per namespace.
 * A namespace helps you to organize your
 * routes, for example 'app', 'public',
 * 'private', etc.
 *
 * [!] Be sure your Layout is defined
 * in parent route, due to <Outlet />
 * that renderices children only.
 *
 * This routes should be used in createRouter
 * function from \@router module.
 */
export const routes = {
	app: [
		{
			Layout: AppLayout,
			children: [
				{
					Component: MainPage,
				},
				{
					lazy: () => import('./pages/detail/Detail.page.tsx'),
					loader: () => Promise.resolve('a promise'),
					path: 'detail/:id?',
				},
			],
		},
	],
} satisfies Record<string, RouteDefinition[]>;
