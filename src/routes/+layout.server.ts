import type { LayoutServerLoad } from "../$types";
import { _getUserOnServer } from "./api/[...remult]/+server";

export const load = (async (event) => {
	const { user } = await _getUserOnServer(event);
	return { user };
}) satisfies LayoutServerLoad;