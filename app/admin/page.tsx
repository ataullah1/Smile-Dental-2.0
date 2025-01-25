"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

function Admin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { status } = useSession();
  const router = useRouter();

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!name || !password) return;
      setIsLoading(true);
      await signIn("credentials", {
        name,
        password,
        callbackUrl: "/admin/bookings",
      });
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message);
    }
  }

  useEffect(() => {
    document.title = "Admin Login | Smile Dental Care";
  }, []);

  if (status === "authenticated") {
    router.push("/admin/bookings");
  }

  return (
    <section>
      <div className=" py-16 md:py-24 lg:py-32">
        <form
          className="mx-auto mb-4 max-w-md w-full pb-4"
          onSubmit={handleLogin}
        >
          <h1 className="text-center text-3xl my-8">
            Login to Smile Dental Care
          </h1>
          <div className="relative">
            <input
              disabled={isLoading}
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="my-4"
              id="username"
              name="username"
              placeholder="username"
              required
            />
          </div>
          <div className="relative mb-4 pb-2">
            <input
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="my-4 "
              placeholder="password"
              required
            />
          </div>
          {error && <p className="text-red-600 text-center my-4">{error}</p>}
          <button
            disabled={isLoading}
            type="submit"
            className=" rounded px-6 py-3 text-center font-semibold text-white bg-blue-600  hover:bg-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
export default Admin;
