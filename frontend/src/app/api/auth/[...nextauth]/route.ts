import NextAuth from "next-auth";
import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CognitoProvider from "next-auth/providers/cognito";

export const authOptions: NextAuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.NEXT_COGNITO_CLIENT_ID!,
      clientSecret: process.env.NEXT_COGNITO_CLIENT_SECRET!,
      issuer: `https://cognito-idp.us-east-1.amazonaws.com/${process.env.NEXT_COGNITO_USER_POOL_ID}`,
      authorization: {
        params: {
          scope: "openid email phone",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.cognitoId = profile.sub;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        accessToken: token.accessToken,
        cognitoId: token.cognitoId,
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
