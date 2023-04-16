declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		MONGO_URI: string;
		JWT_SECRET: string;
	}
}

declare module Express {
	// export interface Request {
	// 	user: any;
	// }
	export interface Response {
		user: any;
	}
}
