import { remultSveltekit } from 'remult/remult-sveltekit'
import { Request } from '../../../shared/Request';
import { createKnexDataProvider } from "remult/remult-knex"

export const _api = remultSveltekit({
    entities: [Request],
    dataProvider: createKnexDataProvider({
        client: "sqlite3",
        connection: {
            filename: "./data.db"
        }
    })
});

export const { GET, POST, PUT, DELETE } = _api;