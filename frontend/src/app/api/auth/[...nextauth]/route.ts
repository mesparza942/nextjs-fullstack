import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
