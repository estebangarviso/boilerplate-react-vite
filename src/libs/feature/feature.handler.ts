import {
	FEATURE_CHANGED_EVENT,
	FeatureChangedEvent,
} from './events/feature-changed.event.ts';

export type FeatureLookup = Record<string, boolean | undefined>;
export type FeatureOnChangeListener = (event: FeatureChangedEvent) => void;

/**
 * Manage feature flags and provides
 * reactivity on change event.
 *
 * @remarks features keys are case-sensitive.
 *
 * @example
 * ```ts
 *	import { FeatureHandler } from '@feature-handler';
 *	import { myRoutes } from '...';
 *
 *	const features = new FeatureHandler({
 *		FEATURE_X_V1: true,
 *		FEATURE_Y_V2: import.meta.env.FEATURE_Y_V2 === 'true',
 *		FEATURE_Z_V2: globalThis.FEATURES.Z_V2,
 *	});
 *
 *	if(features.get(FEATURE_X_V1)) {
 *		console.log('feature X V1 enabled!');
 *	}
 *
 *	features.addOnChangeListener(({ changedFeatures }) => {
 *		console.log('features are changed!');
 *	});
 *
 *	features.set('FEATURE_X_V1', true); // --> nothing happens
 *	features.set('FEATURE_X_V1', false); // --> prints "features are changed!"
 *```
 */
export class FeatureHandler {
	/**
	 * Registers a callback for listen to features changes.
	 *
	 * @param listener - callback triggered on change
	 */
	addOnChangeListener(listener: FeatureOnChangeListener): void {
		this._emitter.addEventListener(FEATURE_CHANGED_EVENT, listener as any);
	}

	/**
	 * Retrieves feature by name.
	 *
	 * @param feature - feature name
	 *
	 * @returns if features is enabled or not
	 */
	get(feature: string): boolean {
		return !!this._features[feature];
	}

	/**
	 * Retrieves all features as a lookup.
	 *
	 * @returns features lookup
	 */
	getAll(): Readonly<FeatureLookup> {
		return this._features;
	}

	/**
	 * Unregister a callback listening for features changes.
	 *
	 * @param listener - callback triggered on change
	 */
	removeOnChangeListener(listener: FeatureOnChangeListener): void {
		this._emitter.removeEventListener(
			FEATURE_CHANGED_EVENT,
			listener as any,
		);
	}

	/**
	 * Sets a feature's value.
	 *
	 * @param feature - feature name
	 * @param value - true of enabled, false if disabled
	 */
	set(feature: string, value: boolean): void {
		const willChange = this._willChange(feature, value);

		this._features[feature] = value;

		if (willChange)
			this._emitter.dispatchEvent(
				new FeatureChangedEvent({ [feature]: value }),
			);
	}

	/**
	 * Merges many feature values.
	 *
	 * @param features - features lookup
	 */
	setAll(features: FeatureLookup): void {
		let isChanged = false;
		const changedFeatures: Record<string, boolean> = {};

		for (const feature in features) {
			const value = !!features[feature];

			if (this._willChange(feature, value)) {
				changedFeatures[feature] = value;
				isChanged = true;
			}
		}

		// no feature value is changed, so event dispatching is cancelled
		if (!isChanged) return;

		this._features = {
			...this._features,
			...changedFeatures,
		};

		this._emitter.dispatchEvent(new FeatureChangedEvent(changedFeatures));
	}

	/**
	 * Determines if a feature value mutate.
	 *
	 * @param feature - feature name
	 * @param value - true of enabled, false if disabled
	 *
	 * @returns true if feature will change it's value
	 */
	private _willChange(feature: string, value: boolean): boolean {
		return !!this._features[feature] !== value;
	}

	constructor(private _features: FeatureLookup = {}) {}

	/**
	 * Event sourcing, for features changes propagation.
	 */
	private _emitter = new EventTarget();

	/**
	 * Maps a list of feature to a features
	 * lookup with all of they enabled.
	 *
	 * @param features - array of enabled features
	 *
	 * @returns enabled features lookup
	 */
	static fromArray(features: string[]): FeatureLookup {
		return features.reduce<FeatureLookup>((features, feature) => {
			features[feature] = true;
			return features;
		}, {});
	}
}
