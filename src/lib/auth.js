import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Function to get the current session on the server side
export async function getSession() {
  return await getServerSession(authOptions);
}

// Function to check if a user is authenticated, and redirect if not
export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

// Function to check if a user is already authenticated and redirect away from auth pages if so
export async function redirectIfAuthenticated() {
  const session = await getSession();

  if (session?.user) {
    redirect("/dashboard");
  }
}
