import { useEffect, useState } from "react";
import { supabase } from "../helpers/supabaseClient";
import { RealState } from "../lib/Interfaces";

export const RealStatetable = () => {
  const [realstate, setRealstate] = useState<RealState[]>([]);

  useEffect(() => {
    getRealState();
  }, [realstate]);

  const getRealState = async () => {
    try {
      const result = await supabase.from("realstate").select("*");
      if (result.data !== null) {
        setRealstate(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="border border-slate-950 w-full">
      <thead className="bg- bg-slate-200">
        <tr>
          <td>Título</td>
          <td>Precio</td>
        </tr>
      </thead>
      <tbody>
        {realstate.map((item) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>${item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
