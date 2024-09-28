
import { BackendMethod, remult } from 'remult';
import { User } from '../User.js';

export class AuthController {
	@BackendMethod({ allowed: true })
	static async signup(email: string, password: string) {
		const { lucia } = await import('../../lib/lucia.js');
		const { Argon2id } = await import('oslo/password');
		const hashedPassword = await new Argon2id().hash(password);

		const existingUser = await remult.repo(User).findOne({ where: { email } });
		if (existingUser) {
			throw Error("You can't signup twice !");
		}
		try {
			const user = await remult.repo(User).insert({
				email,
				hashedPassword
			});
			const session = await lucia.createSession(user.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			remult.context.setCookie(sessionCookie.name, sessionCookie.value, { path: '/' });
			remult.context.session = session;
			remult.user = { id: user.id, name: user.email, roles: [] };
		} catch (error) {
			throw Error('An error occured while signing up !');
		}

		return 'ok';
	}

	@BackendMethod({ allowed: true })
	static async signin(email: string, password: string) {
		const { lucia } = await import('../../lib/lucia.js');
		const { Argon2id } = await import('oslo/password');
		const existingUser = await remult.repo(User).findOne({ where: { email } });
		if (existingUser) {
			const validPassword = await new Argon2id().verify(existingUser.hashedPassword, password);
			if (validPassword) {
				const session = await lucia.createSession(existingUser.id, {});
				const sessionCookie = lucia.createSessionCookie(session.id);

				remult.context.setCookie(sessionCookie.name, sessionCookie.value, { path: '/' });
				remult.context.session = session;
				remult.user = { id: existingUser.id, name: existingUser.email, roles: [] };

				return 'ok';
			}
		}
		throw Error('Incorrect username or password');
	}

	@BackendMethod({ allowed: true })
	static async signout() {
		const { lucia } = await import('../../lib/lucia.js');
		if (remult.context.session) {
			await lucia.invalidateSession(remult.context.session.id);
		}
		remult.context.deleteCookie(lucia.sessionCookieName, { path: '/' });
	}

	@BackendMethod({ allowed: true })
	static async getCurrentUser() {
		return remult.user;
	}
}