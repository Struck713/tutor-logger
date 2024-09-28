import type { RequestEvent } from '@sveltejs/kit';
import { remult } from 'remult';
import { createKnexDataProvider } from "remult/remult-knex";
import { remultSveltekit } from 'remult/remult-sveltekit';
import { Request } from '../../../shared/Request';
import { lucia } from '$lib/lucia';
import { Session, User } from '../../../shared/User';
import { AuthController } from '../../../shared/auth/AuthController';

declare module 'remult' {
	export interface RemultContext {
		session: import('lucia').Session | null;
		setHeaders(headers: Record<string, string>): void;
		setCookie(...args: Parameters<RequestEvent['cookies']['set']>): void;
		deleteCookie(...args: Parameters<RequestEvent['cookies']['delete']>): void;
	}
}

export const _api = remultSveltekit({
	admin: true,
	initRequest: async (event) => {
		const sessionId = event.cookies.get(lucia.sessionCookieName);

		remult.context.setHeaders = (headers) => event.setHeaders(headers);
		remult.context.setCookie = (name, value, opts) => event.cookies.set(name, value, opts);
		remult.context.deleteCookie = (name, opts) => event.cookies.delete(name, opts);

		if (sessionId) {
			const { session, user } = await lucia.validateSession(sessionId);
			if (session && session.fresh) {
				const sessionCookie = lucia.createSessionCookie(session.id);
				event.cookies.set(sessionCookie.name, sessionCookie.value, {
					path: '/',
					...sessionCookie.attributes
				});
			}

			remult.context.session = session;
			remult.user = user ? { id: user.id, name: user.email, roles: [] } : undefined;
		}
	},
    dataProvider: createKnexDataProvider({
		client: "sqlite3",
        connection: {
			filename: "./data.db"
        }
    }),
	controllers: [AuthController], 
    entities: [Request, User, Session],
});

export const { GET, POST, PUT, DELETE } = _api;

export const _getUserOnServer = async (event: RequestEvent) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) return { session: undefined, user: undefined };

	return await _api.withRemult(event, async () => {
		const { session, user } = await lucia.validateSession(sessionId);

		remult.context.session = session;
		remult.user = user ? { id: user.id, name: user.email, roles: [] } : undefined;

		return {
			session,
			user: remult.user
		};
	});
};