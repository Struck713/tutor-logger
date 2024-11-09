import type { Handle } from '@sveltejs/kit';
import { _api } from './routes/api/[...remult]/+server.js';
import { sequence } from '@sveltejs/kit/hooks';
import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';
import { remult } from 'remult';
import { User } from './shared/User.js';
import argon2 from 'argon2';

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
        const user = await _api.withRemult({ request } as any, async () => 
          remult.repo(User).findFirst({ email }))
        .catch(_ => null);

        if (!user) return null;
        if (!await argon2.verify(user.hashedPassword, password as string)) return null;

        return {
          id: user.id,
          email: user.email,
          roles: user.roles,
        };
      }
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      const user = await remult.repo(User).findFirst({ id: token.sub });
      return {
        ...session,
        user: {
          ...user,
          hashedPassword: undefined
        },
      }
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login"
  }
})

const handleRemult: Handle = async ({ event, resolve }) => await _api.withRemult(event, async () => await resolve(event));
export const handle = sequence(handleAuth, handleRemult);
