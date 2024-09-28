import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../$types";
import { _getUserOnServer } from "../api/[...remult]/+server";

export const load = (async (event) => {
	const { user } = await _getUserOnServer(event);

    if (!user) {
        throw redirect(307, "/auth/login");
    }

	return { user };
}) satisfies LayoutServerLoad;