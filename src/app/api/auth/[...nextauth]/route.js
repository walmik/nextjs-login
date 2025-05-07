import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// For a real application, you would connect to a database
// and validate credentials against stored user data
const mockUsers = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    password: "password123",
  },
];

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = mockUsers.find((user) => user.email === credentials.email);

        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "YOUR_SECRET_KEY_HERE", // In production, use an environment variable
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
