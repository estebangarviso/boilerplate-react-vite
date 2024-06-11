import { createRouter } from '#libs/router';
import { routes } from './app.routes.tsx';

// creates a router
const Router = createRouter({
	fallback: <h1>Not Found</h1>,
	loading: <h1>Loading</h1>,
	options: { basename: import.meta.env.BASE_URL },
	routes: routes.app,
});

/**
 * Application routing handler.
 *
 * Here you can define logic
 * for authorization or redirection .
 *
 * @returns application router
 */
export const AppRouter: React.FC = (): React.ReactElement => {
	return <Router />;
};
