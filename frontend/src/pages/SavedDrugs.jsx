function SavedDrugs({ goToDashboard, goToResults }) {
  const savedDrugs = ["Ibuprofen", "Amoxicillin", "Tylenol"];

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <h1>MediClear</h1>

        <nav>
          <button onClick={goToDashboard}>Search</button>
          <button>Saved Drugs</button>
        </nav>
      </header>

      <section className="dashboard-content">
        <h2>Saved Drugs</h2>

        <div className="saved-list">
          {savedDrugs.map((drug) => (
            <div className="saved-drug-card" key={drug}>
              <h3>{drug}</h3>

              <div>
                <button onClick={() => goToResults(drug)}>View</button>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default SavedDrugs;