import { type RouteObject } from 'react-router-dom';
import { type XOR } from './xor.d.ts';

export type LayoutRouteComponent =
	| React.ComponentType
	| React.LazyExoticComponent<any>;

export interface ComponentRoute extends Omit<RouteObject, 'index'> {
	children?: RouteDefinition[];
	lazy?: () => Promise<{ default: React.ComponentType<any> }>;
}

export interface LayoutRoute
	extends Omit<ComponentRoute, 'Component' | 'element'> {
	Layout: LayoutRouteComponent;
	loading?: React.ReactNode;
}

export type RouteDefinition = XOR<ComponentRoute, LayoutRoute>;
