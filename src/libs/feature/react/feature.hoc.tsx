import { Suspense, useEffect, useState } from 'react';
import type {
	FeatureHandler,
	FeatureOnChangeListener,
} from '../feature.handler.ts';
import { FeatureContext } from './Feature.provider.tsx';
import { FeatureContextException } from './exceptions/feature-context.exception.ts';

type ReactComponent<Props = unknown> =
	| React.ComponentType<Props>
	| React.LazyExoticComponent<React.ComponentType<Props>>;

/**
 * Switches between components depending
 * of enabled features in FeatureHandler.
 */
const FeatureSwitch: React.FC<FeatureSwitchProps> = ({
	components,
	fallback,
	handler,
	props,
}) => {
	const [feature, setFeature] = useState<string | null>();

	useEffect(() => {
		const dependentFeatures = Object.keys(components);

		// iterates over dependant features for gets first enabled
		const calcFeatureOn = () => {
			let newFeature = null;

			for (const feature of dependentFeatures) {
				if (handler.get(feature)) {
					newFeature = feature;
					break;
				}
			}

			setFeature(newFeature);
		};

		// recalculates feature on when a dependant change occurs
		const listener: FeatureOnChangeListener = ({ changedFeatures }) => {
			const willRender = dependentFeatures.some(
				(feature) => changedFeatures[feature] !== undefined,
			);

			if (willRender) calcFeatureOn();
		};

		handler.addOnChangeListener(listener);
		calcFeatureOn();

		return () => handler.removeOnChangeListener(listener);
	}, [handler]);

	const Component = feature ? components[feature] : null;
	return Component ? <Component {...props} /> : fallback;
};

/**
 * Allows to switch between different
 * components pointing to a feature flag.
 * Uses a FeatureHandler on behind.
 *
 * @example
 * ```ts
 *	import { withFeatures } from '@feature-handler';
 *	import { MyComponentV2 } from './MyComponent.v2.tsx';
 *
 *	export const MyComponent = withFeatures({
 *		fallback: <h1>No Features Enabled</h1>,
 *		loading: <h1>Loading Feature</h1>,
 *		features: {
 *			MY_FEATURE_V1: lazy(() => import('./MyComponent.v1.tsx')),
 *			MY_FEATURE_V2: MyComponentV2,
 *		},
 *	});
 *
 *	...
 *	<MyComponent />
 *```
 */
export const withFeatures = <Props,>({
	fallback,
	features,
	loading,
}: WithFeaturesConfig<Props>): ReactComponent<Props> => {
	return (props: Props): React.ReactElement => (
		<FeatureContext.Consumer>
			{(handler) => {
				if (!handler) throw new FeatureContextException();

				return (
					<Suspense fallback={loading}>
						<FeatureSwitch
							components={features}
							fallback={fallback}
							handler={handler}
							props={props}
						/>
					</Suspense>
				);
			}}
		</FeatureContext.Consumer>
	);
};

interface FeatureSwitchProps {
	components: Record<string, ReactComponent<any>>;
	fallback?: React.ReactNode;
	handler: FeatureHandler;
	props: any;
}

export interface WithFeaturesConfig<Props = unknown> {
	fallback?: React.ReactNode;
	features: Record<string, ReactComponent<Props>>;
	loading?: React.ReactNode;
}
