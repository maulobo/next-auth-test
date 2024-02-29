"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formdata.get("email"),
      password: formdata.get("password"),
      redirect: false,
    });
    if (res?.error) return setError(res.error as string);
    if (res?.ok) return router.push("/dashboard");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
        <h1>SignIp</h1>
        <input
          type="email"
          placeholder="mauro@gmail.com"
          name="email"
          className="bg-zing-800 p-4 py-2 block mb-2"
        />
        <input
          type="password"
          placeholder="*******"
          name="password"
          autoComplete="true"
          className="bg-zing-800 p-4 py-2 block mb-2"
        />
        <button className="bg0indigo-500 p-4 py-2">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
