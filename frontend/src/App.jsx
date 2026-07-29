import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DrugResults from "./pages/DrugResults";
import SavedDrugs from "./pages/SavedDrugs";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [selectedDrug, setSelectedDrug] = useState("");

  function openResults(drugName) {
    setSelectedDrug(drugName);
    setPage("results");
  }

  if (page === "login") {
    return (
      <Login
        goToSignup={() => setPage("signup")}
        goToDashboard={() => setPage("dashboard")}
      />
    );
  }

  if (page === "signup") {
    return (
      <Signup
        goToLogin={() => setPage("login")}
        goToDashboard={() => setPage("dashboard")}
      />
    );
  }

  if (page === "dashboard") {
    return (
      <Dashboard
        goToResults={openResults}
        goToSavedDrugs={() => setPage("saved")}
        logOut={() => setPage("login")}
      />
    );
  }

  if (page === "results") {
    return (
      <DrugResults
        drugName={selectedDrug}
        goToDashboard={() => setPage("dashboard")}
        goToSavedDrugs={() => setPage("saved")}
      />
    );
  }

 if (page === "saved") {
  return (
    <SavedDrugs
      goToDashboard={() => setPage("dashboard")}
      goToResults={(drug) => {
        setSelectedDrug(drug);
        setPage("results");
      }}
    />
  );
}

  return null;
}

export default App;