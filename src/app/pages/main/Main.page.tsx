import { useEffect } from 'react';
import { Link, Page } from '#libs/router';
import Logo from '../../assets/logo.svg';
import viteLogoUrl from '../../assets/vite.png';
import { useSampleStore } from '../../stores/sample.store.ts';
import styles from './main.page.module.scss';

/**
 * Main page.
 */
export const MainPage: React.FC = (): React.ReactElement => {
	const { message, setStatus } = useSampleStore();

	// effects
	useEffect(() => {
		setStatus(200);
	}, [setStatus]);

	// jsx
	return (
		<Page className={styles.page} title='Main Page'>
			<Link to='/detail'>Go To Detail</Link>
			<Link to='/detail/123'>Go To Detail 123</Link>

			<h1 className='text-brand font-bold underline'>
				hello world
				<div className='mdi-alarm text-orange-400' />
			</h1>

			<h2>{import.meta.env.APP_ENV}</h2>
			<h3 className='text-green-700 font-bold'>{message}</h3>

			<img alt='logo' src={Logo} width='10%' />
			<img alt='vite logo' src={viteLogoUrl} width='10%' />
		</Page>
	);
};

export default MainPage;
