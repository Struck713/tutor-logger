import { remultSveltekit } from 'remult/remult-sveltekit'
import { Request } from '../../../shared/Request';

export const _api = remultSveltekit({
    entities: [Request]
});

export const { GET, POST, PUT, DELETE } = _api;