import type { RequestEvent } from "@sveltejs/kit";
import { type UserInfo } from "remult";
import { MongoDataProvider } from "remult/remult-mongo";
import { remultSveltekit } from "remult/remult-sveltekit";
import { Request } from "../../../shared/Request";
import { User } from "../../../shared/User";
import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";

export const _api = remultSveltekit({
  admin: true,
  dataProvider: async () => {
    const client = new MongoClient(env.DB_URL);
    await client.connect();
    return new MongoDataProvider(client.db("tutortracker"), client);
  },
  getUser: async (event) => {
      const auth = await event?.locals?.auth()
      return auth?.user as UserInfo
  },
  entities: [Request, User],
});

export const { GET, POST, PUT, DELETE } = _api;
