import { FormEvent, useState } from "react";
import { supabase } from "../helpers/supabaseClient.ts";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await supabase.auth.signInWithOtp({
      email: email,
    });
    if (!result.error) {
      setEmail("");
    }
  };

  return (
    <main className="w-full h-[90vh] flex flex-col justify-center items-center gap-4">
      <h1 className="mb-10 text-2xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="w-1/4 flex flex-col gap-8">
        <input
          type="email"
          name="email"
          placeholder="Enter your e-mail"
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 px-4 border-2 border-slate-400"
        />
        <button
          type="submit"
          className="h-12 px-4 bg-red-400 hover:bg-red-700 border border-slate-900">
          Enviar
        </button>
      </form>
    </main>
  );
};
