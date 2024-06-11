import {
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	test,
	vi,
} from 'vitest';
import { FeatureHandler } from '../feature.handler.ts';
import { linkStorageToFeatureHandler } from './link-storage-to-handler.ts';

describe('link storages to feature handler', () => {
	beforeAll(() => {
		vi.spyOn(globalThis, 'addEventListener');
	});

	afterEach(() => {
		localStorage.clear();
		sessionStorage.clear();
	});

	afterAll(() => {
		vi.clearAllMocks();
	});

	test('register listener for sets changed key in handler', () => {
		const prefix = 'feat:';
		const feature = 'FEATURE_V1';
		const event = {
			key: `${prefix}${feature}`,
			newValue: 'true',
		} as StorageEvent;
		const handler = new FeatureHandler();

		linkStorageToFeatureHandler(handler, prefix);
		const [, callback] = vi.mocked(addEventListener).mock
			.calls[0] as any as [string, (event: StorageEvent) => void];
		callback(event);

		expect(handler.get(feature)).toBe(true);
	});

	test('sets current features from storage in handler', () => {
		const prefix = 'feat:';
		const feature1 = 'FEATURE_V1';
		const feature2 = 'FEATURE_V2';
		const handler = new FeatureHandler();

		localStorage.setItem(`${prefix}${feature1}`, '1');
		sessionStorage.setItem(`${prefix}${feature2}`, 'true');
		linkStorageToFeatureHandler(handler, prefix);

		expect(handler.get(feature1)).toBe(true);
		expect(handler.get(feature2)).toBe(true);
	});

	test('when no prefix match, skips', () => {
		const prefix = 'feat:';
		const feature = 'FEATURE_V1';
		const event = {
			key: feature,
			newValue: 'true',
		} as StorageEvent;
		const handler = new FeatureHandler();

		linkStorageToFeatureHandler(handler, prefix);
		const [, callback] = vi.mocked(addEventListener).mock
			.calls[0] as any as [string, (event: StorageEvent) => void];
		callback(event);

		expect(handler.get(feature)).toBe(false);
	});

	test('sessionStorage has precedence over localStorage', () => {
		const prefix = 'feat:';
		const feature = 'FEATURE_V1';
		const eventSession = {
			key: `${prefix}${feature}`,
			newValue: 'false',
			storageArea: sessionStorage,
		} as StorageEvent;
		const eventLocal = {
			key: `${prefix}${feature}`,
			newValue: 'true',
			storageArea: localStorage,
		} as StorageEvent;
		const handler = new FeatureHandler();

		linkStorageToFeatureHandler(handler, prefix);
		const [, callback] = vi.mocked(addEventListener).mock
			.calls[0] as any as [string, (event: StorageEvent) => void];
		callback(eventSession);
		callback(eventLocal);

		expect(handler.get(feature)).toBe(false);
	});
});
