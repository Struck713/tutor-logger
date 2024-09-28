import { Entity, Fields, Validators } from "remult";

@Entity('user', {
	allowApiCrud: false
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