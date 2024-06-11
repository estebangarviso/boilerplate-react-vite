/**
 * Thrown when any feature hook or HOC
 * is used without wraps the context with
 * FeatureProvider.
 */
export class FeatureContextException extends Error {
	constructor() {
		super('FeatureContext must wrap current context');
	}
}
