import { useContext, useEffect, useState } from 'react';
import type {
	FeatureHandler,
	FeatureOnChangeListener,
} from '../feature.handler.ts';
import { FeatureContext } from './Feature.provider.tsx';
import { FeatureContextException } from './exceptions/feature-context.exception.ts';

/**
 * Returns feature handler.
 * It does not get triggered on features changes,
 * use "addOnChangeListener" for observes it.
 */
export const useFeatureHandler = (): FeatureHandler => {
	const handler = useContext(FeatureContext);

	if (!handler) throw new FeatureContextException();

	return handler;
};

/**
 * Returns a feature and allows to set it.
 * Rerenders the component if any change occurs.
 */
export const useFeature = (feature: string) => {
	const handler = useFeatureHandler();
	const [value, setFeature] = useState(handler.get(feature));

	useEffect(() => {
		const listener: FeatureOnChangeListener = ({ changedFeatures }) => {
			const newValue = changedFeatures?.[feature];
			if (newValue !== undefined) {
				setFeature(newValue);
			}
		};

		handler.addOnChangeListener(listener);

		return () => handler.removeOnChangeListener(listener);
	}, [feature]);

	return [value, (value: boolean) => handler.set(feature, value)] as const;
};
