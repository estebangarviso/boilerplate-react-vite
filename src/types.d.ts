export declare global {
	// SECTION: built-in types tweaks
	interface JSON {
		parse<T = unknown>(
			text: string,
			reviver?: (this: any, key: string, value: any) => any,
		): T;
	}

	type ObjectKeys<T> = T extends object
		? (keyof T)[]
		: T extends number
			? []
			: T extends any[] | string
				? string[]
				: never;

	interface ObjectConstructor {
		keys<T>(o: T): ObjectKeys<T>;
	}

	// SECTION: global custom types
	type decimal = number;

	type seconds = number;

	type millis = number;

	type password = string;

	type bytes = number;

	type uuid = string;

	// unix timestamp, number of seconds that have elapsed since January 1, 1970
	type epoch = seconds;

	type AnyError = unknown;

	// https://en.wikipedia.org/wiki/ISO_8601#Durations
	type DurationISO8601 = string;
}
