import type { FetchBoxProps } from './FetchBox.tsx';
import styles from './fetch-box.module.scss';

export const FetchBox_v1: React.FC<FetchBoxProps> = ({ logoSrc }) => {
	return (
		<div className={styles.box}>
			<img alt='logo' className={styles.logo} src={logoSrc} />
		</div>
	);
};
