import type { LayoutRoute, RouteDefinition } from './route.d.ts';

export const isLayoutRoute = (route: RouteDefinition): route is LayoutRoute => {
	return !!(route as LayoutRoute).Layout;
};
