import { FeatureHandler, linkStorageToFeatureHandler } from '#libs/feature';

/**
 * Defines features for use "withFeatures" HOC.
 * Eases features render and switching using
 * local and session storage for toggling features.
 */
export const featureHandler = new FeatureHandler({
	FEATURE_FETCHBOX_V2ALPHA: true,
});

// connects local and session storage to feature handler
linkStorageToFeatureHandler(featureHandler);
