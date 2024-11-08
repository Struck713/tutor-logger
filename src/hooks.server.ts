import type { Handle } from '@sveltejs/kit';
import { _api } from './routes/api/[...remult]/+server.js';
import { sequence } from '@sveltejs/kit/hooks';
import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';
import { remult } from 'remult';
import { User } from './shared/User.js';
import Bun from "bun"

export const { handle: handleAuth } = SvelteKitAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {
          placeholder: 'The email to sign in with.',
        },
        password: {
          placeholder: 'The password for that email.',
        },
      },
      authorize: async ({ email, password }, request) => {
        if (!email || !password) return null;
        const res = await _api.withRemult({ request } as any, async () => {
          let user = await remult.repo(User).findFirst({ email });
          if (!user) return null;
          if (!await Bun.password.verifySync(password as string, user.hashedPassword).catch(_ => false)) return null;
          return {
            id: user.id,
            email: user.email,
            roles: user.roles,
          }
        }).catch(_ => null);

        console.log(res);

        return res
      }
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => ({
      ...session,
      user: await remult.repo(User).findFirst({ id: token.sub }),
    }),
  },
  pages: {
    signIn: "/auth/login",
  }
})

const handleRemult: Handle = async ({ event, resolve }) => await _api.withRemult(event, async () => await resolve(event));
export const handle = sequence(handleAuth, handleRemult);
