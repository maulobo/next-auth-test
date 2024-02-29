"use client";

import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);

    try {
      const email = formdata.get("email");
      const password = formdata.get("password");
      const fullname = formdata.get("fullname");

      const signUpResponse = await axios.post("/api/auth/signup", {
        email,
        password,
        fullname,
      });

      console.log(signUpResponse);

      const res = await signIn("credentials", {
        email: signUpResponse.data.email,
        password: formdata.get("password"),
        redirect: false,
      });
      if (res?.ok) return router.push("/dashboard");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && (
          <div
            className="bg-red-500 text-white p-2 mb-2
         "
          >
            {error}
          </div>
        )}
        <h1>SignUp</h1>
        <input
          type="text"
          placeholder="mauro"
          name="fullname"
          className="bg-zing-800 p-4 py-2 block mb-2"
        />
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
        <button className="bg0indigo-500 p-4 py-2">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
