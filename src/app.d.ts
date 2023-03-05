// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			code?: string
		}
		interface Locals {
			id: number;
			studentNumber: string;
			homeRoomName: string;
			// nouns: string;
			// startDate: string;
			// endDate: string;
		}
		// interface PageData {
		// 	nouns?: {
		// 		id: number,
		// 		name: string
		// 	}[]
		// }
		// interface Platform {}
	}
}

export {};
