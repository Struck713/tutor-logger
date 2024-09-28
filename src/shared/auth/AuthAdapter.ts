import type { Adapter, DatabaseSession, DatabaseUser } from 'lucia';
import { remult } from 'remult';
import { User, Session } from '../User';

export class RemultLuciaAdapter implements Adapter {
	
	getSessionAndUser = async (sessionId: string): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> => {
		const session = await remult.repo(Session).findId(sessionId);
		if (session) {
			const user = await remult.repo(User).findId(session.userId);
			if (user) return [ { ...session, attributes: {} }, { id: user.id, attributes: { email: user.email } }];
		}
		return [null, null];
	}

	getUserSessions = async (userId: string): Promise<DatabaseSession[]> => (await remult.repo(Session).find({ where: { userId } })).map((s) => ({ ...s, attributes: {} }));
	setSession = async (session: DatabaseSession): Promise<void> => { await remult.repo(Session).insert(session) };
	updateSessionExpiration = async (sessionId: string, expiresAt: Date): Promise<void> => { await remult.repo(Session).update(sessionId, { expiresAt }); }
	deleteSession = async (sessionId: string): Promise<void> => { await remult.repo(Session).delete(sessionId); }
	deleteUserSessions = async (userId: string): Promise<void> => { await remult.repo(Session).deleteMany({ where: { userId } }); }
	deleteExpiredSessions = async (): Promise<void> => { await remult.repo(Session).deleteMany({ where: { expiresAt: { $lt: new Date() } } }); }
}