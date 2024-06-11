export const FEATURE_CHANGED_EVENT = 'feature_changed';

/**
 * Triggered when a feature changes from FeatureHandler.
 */
export class FeatureChangedEvent extends Event {
	constructor(readonly changedFeatures: Record<string, boolean>) {
		super(FEATURE_CHANGED_EVENT);
	}
}
