import { randomUUID } from 'crypto';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { type User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      id: 'worldcoin',
      name: 'Worldcoin',
      type: 'oauth',
      wellKnown: 'https://id.worldcoin.org/.well-known/openid-configuration',
      authorization: { params: { scope: 'openid' } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ['state', 'nonce', 'pkce'],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          verificationLevel:
            profile['https://id.worldcoin.org/v1'].verification_level,
        };
      },
    },
    CredentialsProvider({
      id: 'guest',
      name: 'guest',
      credentials: {},
      async authorize() {
        return await createGuestUser();
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (token.name?.includes('Guest')) {
        token.userRole = 'guest';
      } else {
        token.userRole = 'real';
      }

      return token;
    },
  },
  debug: true,
};

const createGuestUser = async (): Promise<User> => {
  const guestGUID = randomUUID();
  return {
    id: guestGUID,
    name: `Guest-${guestGUID}`,
  };
};

export default NextAuth(authOptions);
