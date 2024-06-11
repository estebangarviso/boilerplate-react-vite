import { create } from 'zustand';
import { fetchSampleAsyncMock } from '../__mocks__/fetch-sample-async.mock.ts';

export interface AsyncSampleResult {
	anyProp?: string;
}

export interface AsyncSampleState {
	content: AsyncSampleResult;
	fetch: () => Promise<void>;
	loading: boolean;
	ready: boolean;
}

export const useAsyncStore = create<AsyncSampleState>((set) => ({
	content: {},
	fetch: async () => {
		set((state) => ({
			...state,
			loading: true,
			ready: false,
		}));

		const response = await fetchSampleAsyncMock();
		const content = await response.json();

		set((state) => ({
			...state,
			content,
			loading: false,
			ready: response.status === 200,
		}));
	},
	loading: false,
	ready: false,
}));
