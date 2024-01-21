import { RealStatetable } from "../components/RealStatetable";

export const Home = () => {
  return (
    <>
      <main className="p-10 w-full h-full flex flex-col justify-start items-center gap-4">
        <h2 className="mb-10 text-xl font-bold text-center">
          Todas las propiedades
        </h2>
        <RealStatetable />
      </main>
    </>
  );
};
