import { useAsyncStore } from '../stores/async.store.ts';
import type { FetchBoxProps } from './FetchBox.tsx';
import styles from './fetch-box.module.scss';

export const FetchBox_v2a: React.FC<FetchBoxProps> = ({ logoSrc }) => {
	const { content, fetch: dispatchFetch, loading } = useAsyncStore();

	return (
		<div className={styles.box}>
			<img alt='logo' className={styles.logo} src={logoSrc} />

			<button className={styles.button} onClick={dispatchFetch}>
				Fetch
			</button>
			{loading ? <h4>Fetching Data</h4> : <h4>{content.anyProp}</h4>}
		</div>
	);
};
