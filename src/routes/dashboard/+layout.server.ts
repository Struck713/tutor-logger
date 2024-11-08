import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../$types";
import { remult } from "remult";

export const load = (async (event) => {
	if (!remult.authenticated()) {
	   throw redirect(303, "/auth/signin")
	}

	return { user: remult.user };
}) satisfies LayoutServerLoad;
