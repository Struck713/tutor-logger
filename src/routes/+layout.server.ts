import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../$types";
import { remult } from "remult";

export const load = (async (event) => {
	return { user: remult.user };
}) satisfies LayoutServerLoad;
