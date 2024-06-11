import { randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import { FeatureHandler } from './feature.handler.ts';

describe(FeatureHandler, () => {
	let _handler: FeatureHandler;

	// hooks
	beforeAll(() => {
		_handler = new FeatureHandler({
			FALSE: false,
			TRUE: true,
		});
	});

	// tests
	test('get enabled feature returns true', () => {
		expect(_handler.get('TRUE')).toBe(true);
	});

	test('get disabled feature returns false', () => {
		expect(_handler.get('FALSE')).toBe(false);
	});

	test('get unknown feature returns false', () => {
		expect(_handler.get('UNKNOWN')).toBe(false);
	});

	test('getAll returns all features', () => {
		const _innerFeatures = (_handler as any)._features;

		expect(_handler.getAll()).toStrictEqual(_innerFeatures);
	});

	test('has event sourcing capabilities', () => {
		const feature = randomUUID();
		const callbackMock = vi.fn();

		_handler.addOnChangeListener(callbackMock);
		_handler.set(feature, true);
		_handler.removeOnChangeListener(callbackMock);
		_handler.set(feature, false);

		expect(callbackMock).toHaveBeenCalledOnce();
	});

	test('does not trigger event when value do not change', () => {
		const feature = randomUUID();
		const callbackMock = vi.fn();

		_handler.addOnChangeListener(callbackMock);
		_handler.set(feature, true);
		// eslint-disable-next-line sonarjs/no-element-overwrite
		_handler.set(feature, true);
		_handler.removeOnChangeListener(callbackMock);

		expect(callbackMock).toHaveBeenCalledOnce();
	});

	test('setAll assigns features lookup', () => {
		const newFeatures = {
			A: true,
			B: false,
		};

		_handler.setAll(newFeatures);

		expect(_handler.get('A')).toBe(true);
		expect(_handler.get('B')).toBe(false);
	});

	test('setAll skips dispatch event when no changes detected', () => {
		const newFeatures = {
			FALSE: false,
			TRUE: true,
		};
		const callbackMock = vi.fn();

		_handler.addOnChangeListener(callbackMock);
		_handler.setAll(newFeatures);
		_handler.removeOnChangeListener(callbackMock);

		expect(callbackMock).not.toHaveBeenCalled();
	});

	test('fromArray static method arms features lookup from string array', () => {
		const newFeatures = ['A', 'B'];
		const expected = {
			A: true,
			B: true,
		};

		const lookup = FeatureHandler.fromArray(newFeatures);

		expect(lookup).toStrictEqual(expected);
	});
});
