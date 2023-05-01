import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "../../../public/profiledata.json";

const options = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = users.find(
          (u) =>
            u.username === credentials.username &&
            u.password === credentials.password
        );
        if (user) {
          // Return user object if login is successful
          return Promise.resolve(user);
        } else {
          // Return null if login fails
          return Promise.resolve(null);
        }
      },
    }),
  ],
};

const authHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
