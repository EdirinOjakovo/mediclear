import { useState } from "react";

function Dashboard({ goToResults, goToSavedDrugs, logOut }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(event) {
    event.preventDefault();

    if (!searchTerm.trim()) {
      return;
    }

    goToResults(searchTerm.trim());
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <h1>MediClear</h1>

        <nav>
          <button type="button">Search</button>

          <button type="button" onClick={goToSavedDrugs}>
            Saved Drugs
          </button>

          <button type="button" onClick={logOut}>
            Log Out
          </button>
        </nav>
      </header>

      <section className="dashboard-content">
        <h2>Search Medications</h2>
        <p>Find clear information about a medication.</p>

        <form className="dashboard-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a drug, e.g. ibuprofen"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <button type="submit">Search</button>
        </form>
      </section>
    </main>
  );
}

export default Dashboard;