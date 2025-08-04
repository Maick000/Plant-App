import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/authContext.jsx";
import { PlantsProvider } from "./context/plantsContext.jsx";

function Root() {
  return (
    <AuthProvider>
      <PlantsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PlantsProvider>
    </AuthProvider>
  );
}

export default Root;