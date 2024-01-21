import { useEffect, useState } from "react";
import { supabase } from "../helpers/supabaseClient";
import { useAuth } from "../context/UserContext";
import { RealState } from "../lib/Interfaces";

interface RealStatetableProps {
  setDataToEdit: React.Dispatch<React.SetStateAction<null | RealState>>;
}

export const RealStateUserTable = ({ setDataToEdit }: RealStatetableProps) => {
  const [realstate, setRealstate] = useState<RealState[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    getRealState();
  }, [realstate]);

  const getRealState = async () => {
    try {
      const result = await supabase
        .from("realstate")
        .select("*")
        .eq("user_id", userId);
      if (result.data !== null) {
        setRealstate(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRealState = async (id: string) => {
    await supabase
      .from("realstate")
      .delete()
      .eq("id", id)
      .eq("user_id", userId)
      .select();
  };

  const handleDataToEdit = (item: RealState) => {
    setDataToEdit(item);
  };

  return (
    <table className="border border-slate-950 w-full">
      <thead className="bg- bg-slate-200">
        <tr>
          <td>Título</td>
          <td>Precio</td>
          <td className="text-center">Acciones</td>
        </tr>
      </thead>
      <tbody>
        {realstate.map((item) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>${item.price}</td>

            <td className="flex justify-between">
              <button onClick={() => handleDataToEdit(item)}>Editar</button>
              <button onClick={() => deleteRealState(item.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
