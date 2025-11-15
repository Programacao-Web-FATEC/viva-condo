"use client"

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { SonnerDemo } from "@/components/toastNotification";

export default function Login() {
  const supabase = createClient();
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        router.replace("/condominios");
      } else {
        setCheckingSession(false);
      }
    };
    checkSession();
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(true);

    if (error?.message == "Invalid login credentials" && !data.user) {
      setError("E-mail ou senha inválidos");
      setLoading(false);
    } else if (error) {
      setError("Erro inesperado. Tente novamente.");
      console.log(error?.message);
      setLoading(false);
    }

    if (data.user) router.replace("/condominios");
  };

  if (checkingSession) {
    return null;
  }

  const type = showPassword ? "text" : "password";

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="w-full flex flex-col items-center justify-center gap-4 p-6">
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Olá 👋</h2>
          <p className="text-gray-500 mb-6">Insira as informações que você usou ao se registrar.</p>
          <SonnerDemo/>
          <form onSubmit={login}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative">
              <input
                type={type}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-4 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-4.5 text-gray-500"
              >
                {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
              </button>
            </div>
            
            <button type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-md hover:opacity-90 transition-all disabled:opacity-50"
              disabled={loading}
            >
              {!loading ? "Entrar" : "Entrando..."}
            </button>
          </form>
        </div>
        {error ?? (
          <h3 className="text-red-600">{error}</h3>
        )}
      </div>
    </div>
  );
}
