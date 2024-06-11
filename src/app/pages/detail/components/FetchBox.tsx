import { lazy } from 'react';
import { withFeatures } from '#libs/feature';
import { FetchBox_v2a } from './FetchBox.v2a.tsx';

// feature managing example
export const FetchBox = withFeatures<FetchBoxProps>({
	fallback: <h1>No Features Enabled</h1>,
	features: {
		FEATURE_FETCHBOX_V2ALPHA: FetchBox_v2a,
		// lazy load chunk
		FEATURE_FETCHBOX_V1: lazy(() =>
			import('./FetchBox.v1.tsx').then(({ FetchBox_v1 }) => ({
				default: FetchBox_v1,
			})),
		),
	},
	loading: <h2>Loading Feature</h2>,
});

export interface FetchBoxProps {
	logoSrc: string;
}
