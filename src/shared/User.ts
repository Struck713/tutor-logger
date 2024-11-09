import { Allow, Entity, Fields, Relations, Validators } from "remult";
import { Request } from "./Request";

@Entity('user', {
	allowApiCrud: false,
	allowApiRead: Allow.authenticated,
})
export class User {
	@Fields.cuid()
	id!: string;

	@Fields.string()
	email!: string;

	roles: string[] = [];

	@Relations.toMany(() => Request, { field: "user" })
	requests: Request[] = [];

	@Fields.string({ includeInApi: false })
	hashedPassword!: string;
}
