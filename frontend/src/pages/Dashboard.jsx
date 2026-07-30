import { useState } from "react";

function Dashboard({ goToResults, goToSavedDrugs, logOut }) {
  const [searchTerm, setSearchTerm] = useState("");

  async function handleSearch(e) {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${encodeURIComponent(
          searchTerm.trim()
        )}"&limit=1`
      );

      if (!response.ok) {
        alert("Drug not found.");
        return;
      }

      const data = await response.json();

      goToResults(data.results[0]);
    } catch (error) {
      console.error(error);
      alert("Search failed.");
    }
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <h1>MediClear</h1>

        <nav>
          <button onClick={goToSavedDrugs}>Saved Drugs</button>
          <button onClick={logOut}>Log Out</button>
        </nav>
      </header>

      <section className="dashboard-content">
        <h2>Search Medication</h2>

        <form onSubmit={handleSearch} className="dashboard-search">
          <input
            type="text"
            placeholder="Enter medication name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>
      </section>
    </main>
  );
}

export default Dashboard;