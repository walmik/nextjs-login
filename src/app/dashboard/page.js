import { requireAuth } from "../../lib/auth";

export default async function DashboardPage() {
  // This will redirect to login if user is not authenticated
  const session = await requireAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="rounded-xl bg-white p-10 shadow-2xl">
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-4 text-lg text-gray-600">
            Welcome,{" "}
            <span className="font-semibold">
              {session.user.name || session.user.email}
            </span>
            ! You are logged in.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            User Information
          </h2>
          <div className="rounded-lg bg-gray-50 p-6 border border-gray-100">
            <div className="space-y-4">
              <p className="flex items-center text-gray-700">
                <span className="font-medium w-24">Email:</span>
                <span>{session.user.email}</span>
              </p>
              {session.user.name && (
                <p className="flex items-center text-gray-700">
                  <span className="font-medium w-24">Name:</span>
                  <span>{session.user.name}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <a
            href="/api/auth/signout"
            className="inline-block rounded-lg bg-black px-6 py-3 text-md font-semibold text-white hover:bg-gray-800 transition-colors duration-200"
          >
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );
}
