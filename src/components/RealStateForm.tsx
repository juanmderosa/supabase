import { FormEvent, useEffect } from "react";
import { supabase } from "../helpers/supabaseClient";
import { useAuth } from "../context/UserContext";
import { RealState } from "../lib/Interfaces";

interface RealStateFormProps {
  newRealState: RealState;
  initialForm: RealState;
  dataToEdit: RealState | null;
  updateRealState: (id: string) => void;
  setNewRealState: React.Dispatch<React.SetStateAction<RealState>>;
}

export const RealStateForm = ({
  newRealState,
  setNewRealState,
  dataToEdit,
  updateRealState,
  initialForm,
}: RealStateFormProps) => {
  const { userId } = useAuth();

  useEffect(() => {
    if (dataToEdit) {
      setNewRealState(dataToEdit);
    } else {
      setNewRealState(initialForm);
    }
  }, [dataToEdit, setNewRealState, initialForm]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newRealState) {
      if (newRealState.id) {
        updateRealState(newRealState.id);
        setNewRealState(initialForm);
      } else {
        try {
          await supabase.from("realstate").insert({
            title: newRealState.title,
            price: newRealState.price,
            user_id: userId,
          });
          setNewRealState(initialForm);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (newRealState) {
      setNewRealState({
        ...newRealState,
        [name]: name === "price" ? parseFloat(value) : value,
      });
    }
  };

  return (
    <div>
      <>
        <h2 className="mb-10 text-xl font-bold text-center">
          Agregar Propiedades
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-8">
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            className="h-12 px-4 border-2 border-slate-400"
            placeholder="Título de la propiedad"
            value={newRealState.title}
          />
          <input
            type="number"
            name="price"
            onChange={handleInputChange}
            value={newRealState.price}
            className="h-12 px-4 border-2 border-slate-400"
            placeholder="Precio de la propiedad"
          />

          <button
            type="submit"
            className="h-12 px-4 bg-red-400 hover:bg-red-700 border border-slate-900">
            {!dataToEdit ? "Agregar propiedad" : "Editar propiedad"}
          </button>
        </form>
      </>
    </div>
  );
};
