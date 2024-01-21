import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/UserContext";
import { MyRealState } from "./pages/MyRealState";
import { Nav } from "./components/Nav";

function App() {
  return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route
          path=""
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/mis-propiedades"
          element={<MyRealState />}
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
