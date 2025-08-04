import { Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfileForm from "./pages/ProfileForm";
import Plants from "./pages/Plants";
import PlantsForm from "./pages/PlantsForm";
import { useAuth } from "./context/useAuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const { loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <main className="container mx-auto px-10">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register isUpdate={false} />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile/:id"
              element={
                <ProfileForm />
              }
            />
            <Route path="/plants" element={<Plants />} />
            <Route path="/plants/:id" element={<PlantsForm />} />
            <Route path="/add-plants" element={<PlantsForm />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
