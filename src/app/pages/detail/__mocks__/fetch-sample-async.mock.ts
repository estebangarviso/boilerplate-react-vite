export const fetchSampleAsyncMock = (): Promise<{
	json: () => any;
	status: number;
}> =>
	new Promise((resolve) =>
		setTimeout(
			() =>
				resolve({
					json: () =>
						Promise.resolve({
							anyProp: 'anyValue',
						}),
					status: 200,
				}),
			2500,
		),
	);
