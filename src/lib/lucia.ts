import { Lucia } from 'lucia';
import { RemultLuciaAdapter } from '../shared/auth/AuthAdapter';

const adapter = new RemultLuciaAdapter();

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === 'production'
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			email: attributes.email
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email?: string;
}