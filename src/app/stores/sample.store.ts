import { create } from 'zustand';

export interface SampleState {
	message: string;
	setStatus: (status: number) => void;
	status: number;
}

export const useSampleStore = create<SampleState>((set) => ({
	message: 'loading',
	setStatus: (status: number) => {
		set({
			message: status === 200 ? 'success' : 'error',
			status,
		});
	},
	status: 0,
}));
