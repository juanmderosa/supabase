import { useState } from "react";
import { RealState } from "../lib/Interfaces";
import { useAuth } from "../context/UserContext";
import { supabase } from "../helpers/supabaseClient";
import { RealStateForm } from "../components/RealStateForm";
import { RealStateUserTable } from "../components/RealStateUserTable";

const initialForm = {
  id: "",
  title: "",
  price: 0,
  user_id: "",
};

export const MyRealState = () => {
  const [dataToEdit, setDataToEdit] = useState<RealState | null>(null);
  const [newRealState, setNewRealState] = useState<RealState>(initialForm);

  const { userId } = useAuth();

  const updateRealState = async (id: string) => {
    try {
      if (dataToEdit) {
        await supabase
          .from("realstate")
          .update({ title: newRealState.title, price: newRealState.price })
          .eq("id", id)
          .eq("user_id", userId)
          .select();
        setDataToEdit(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="p-10 w-full h-[90vh] flex flex-col justify-start items-center gap-4">
      <RealStateForm
        dataToEdit={dataToEdit}
        updateRealState={updateRealState}
        newRealState={newRealState}
        setNewRealState={setNewRealState}
        initialForm={initialForm}
      />
      <RealStateUserTable setDataToEdit={setDataToEdit} />
    </main>
  );
};
