import NextAuth from "next-auth/next";

import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../helpers/auth";
import connectToDatabase from "../../../helpers/db";

export default NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found");
        }

        const passwordIsValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!passwordIsValid) {
          client.close();
          throw new Error("Invalid Credentials");
        }
        client.close();
        return {
          email: user.email,
        };
      },
    }),
  ],
  secret: `${process.env.SECRET}`,
});
