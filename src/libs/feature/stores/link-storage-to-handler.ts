import type { FeatureHandler } from '../feature.handler.ts';

/**
 * Coerce local and session storage
 * values to boolean.
 *
 * @param value - string
 *
 * @returns true if input is '1' or 'true', false in otherwise
 */
const coerceStorageBoolean = (value: string | null) =>
	value === '1' || value === 'true';

/**
 * Filters a key by prefix.
 *
 * @returns null if key does not match.
 */
const getStorageKey = (key: string | null, prefix: string): string | null => {
	if (key?.startsWith(prefix)) {
		return key.replace(prefix, '');
	}

	return null;
};

/**
 * Searches for local and session storage
 * prefixed keys and returns it's feature boolean value.
 *
 * @param storage - localStorage, sessionStorage
 * @param prefix - prefix for filter searched keys
 *
 * @returns features lookup
 */
const getStorageFeatures = (
	storage: Storage,
	prefix: string,
): Record<string, boolean> => {
	const features: Record<string, boolean> = {};

	for (const [key, value] of Object.entries(storage)) {
		const feature = getStorageKey(key, prefix);
		if (feature) features[feature] = coerceStorageBoolean(value);
	}

	return features;
};

/**
 * Search for features in session and local storage
 * and sets find values in features handler.
 *
 * @param handler - feature handler
 * @param prefix - key prefix filter
 */
export const linkStorageToFeatureHandler = (
	handler: FeatureHandler,
	prefix = '::',
): void => {
	handler.setAll({
		...getStorageFeatures(localStorage, prefix),
		...getStorageFeatures(sessionStorage, prefix),
	});

	addEventListener('storage', ({ key, newValue, storageArea }) => {
		const feature = getStorageKey(key, prefix);

		if (!feature) return;

		// keeps sessionStorage precedence
		if (storageArea === localStorage) {
			const sessionValue = sessionStorage[key!];
			newValue = sessionValue === undefined ? newValue : sessionValue;
		}

		handler.set(feature, coerceStorageBoolean(newValue));
	});
};
