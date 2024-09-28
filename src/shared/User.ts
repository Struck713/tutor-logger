import { Allow, Entity, Fields, Relations, Validators } from "remult";
import { Request } from "./Request";

@Entity('user', {
	allowApiCrud: false,
	allowApiRead: Allow.authenticated,
})
export class User {
	@Fields.cuid()
	id!: string;

	@Fields.string<User>({
		validate: [
			Validators.unique(),
			(e) => {
				if (e.email.length < 2) throw 'Must be at least 2 characters long';
			}
		]
	})
	email!: string;

	@Relations.toMany(() => Request)
	requests: Request[] = [];

	@Fields.string({ includeInApi: false })
	hashedPassword!: string;
}

@Entity('session', {
	allowApiCrud: false
})
export class Session {
	@Fields.cuid()
	id!: string;

	@Fields.date()
	expiresAt!: Date;

	@Fields.string()
	userId!: string;
}