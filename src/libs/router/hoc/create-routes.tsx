import { Suspense, lazy } from 'react';
import { Outlet, type RouteObject } from 'react-router-dom';
import { isLayoutRoute } from '../types/is-layout-route.ts';
import type {
	ComponentRoute,
	LayoutRouteComponent,
	RouteDefinition,
} from '../types/route.d.ts';

const renderLayout = (
	Layout: LayoutRouteComponent,
	loading: React.ReactNode,
) => {
	if (loading)
		return () => (
			<Layout>
				<Suspense fallback={loading}>
					<Outlet />
				</Suspense>
			</Layout>
		);

	return () => (
		<Layout>
			<Outlet />
		</Layout>
	);
};

export const createRoutes = (routes: RouteDefinition[]): RouteObject[] => {
	for (const route of routes) {
		if (isLayoutRoute(route)) {
			const { Layout, loading } = route;

			(route as ComponentRoute).Component = renderLayout(Layout, loading);

			(route as RouteDefinition).Layout = undefined;
		}

		route.path ??= '';

		// lazy load component for chunk splitting
		if (route.lazy) {
			route.Component ??= lazy(route.lazy);
			route.lazy = undefined;
		}

		if (route.children) createRoutes(route.children);
	}

	return routes as RouteObject[];
};
