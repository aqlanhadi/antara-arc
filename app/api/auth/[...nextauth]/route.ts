import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        // console.log(credentials)

        const { username, password } = credentials;

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: username,
            },
          });

          
          if (!user) return null
          
          const passwordMatch = await bcrypt.compare(password, user?.password || '');

          if (!passwordMatch) return null;

          return user
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // callbacks: {
  //   session: ({ session, token }) => {
  //     console.log("Session Callback", { session, token });
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //         randomKey: token.randomKey,
  //       },
  //     };
  //   },
  //   jwt: ({ token, user }) => {
  //     console.log("JWT Callback", { token, user });
  //     if (user) {
  //       const u = user as unknown as any;
  //       return {
  //         ...token,
  //         id: u.id,
  //         randomKey: u.randomKey,
  //       };
  //     }
  //     return token;
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
