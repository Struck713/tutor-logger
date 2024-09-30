import type { Handle } from '@sveltejs/kit';
import { _api } from './routes/api/[...remult]/+server.js';
import { sequence } from '@sveltejs/kit/hooks';

const handleRemult: Handle = async ({ event, resolve }) => {
	return await _api.withRemult(event, async () => await resolve(event));
};

export const handle = sequence(handleRemult);