import { Link } from "react-router-dom";
import { supabase } from "../helpers/supabaseClient";
import { useAuth } from "../context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { setUserId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((session) => {
      if (session === "SIGNED_OUT") {
        setIsLogged(false);
      } else {
        setIsLogged(true);
      }
    });
  }, []);

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    setUserId("");
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-8 bg-red-400 ">
      <Link to={"/"}>
        <h1 className="text-white font-bold text-3xl">REAL STATE APP</h1>
      </Link>

      <nav className="text-xl font-xl text-white flex items-center gap-8 ">
        <Link
          to={"/"}
          className="hover:underline">
          Inicio
        </Link>
        {isLogged && (
          <Link
            to={"/mis-propiedades"}
            className="hover:underline">
            Mis Propiedades
          </Link>
        )}
        {isLogged ? (
          <button
            onClick={() => handleLogOut()}
            className="hover:underline">
            Log Out
          </button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </nav>
    </header>
  );
};
