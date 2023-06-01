import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signJwtToken } from "@/app/lib/jwt";
import bcrypt from "bcrypt";
import db from "@/app/lib/db";
import Admin from "@/app/models/Admin";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: " email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        await db.connect();
        const admin = await Admin.findOne({ email });

        if (!admin) {
          throw new Error("Invalid credentials");
        }

        const comparePassword = await bcrypt.compare(password, admin.password);

        if (!comparePassword) {
          throw new Error("Invalid credentials");
        } else {
          const { password, ...currentAdmin } = admin._doc;
          const accessToken = signJwtToken(currentAdmin, { expiresIn: "7d" });
          return {
            ...currentAdmin,
            accessToken,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, admin }) {
      if (admin) {
        token.accessToken = admin.accessToken;
        token._id = admin._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.admin = { _id: token._id, accessToken: token.accessToken };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
