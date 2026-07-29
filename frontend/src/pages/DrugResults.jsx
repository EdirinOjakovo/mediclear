function DrugResults({ drugName, goToDashboard, goToSavedDrugs }) {
  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <h1>MediClear</h1>

        <nav>
          <button onClick={goToDashboard}>Search</button>
          <button onClick={goToSavedDrugs}>Saved Drugs</button>
        </nav>
      </header>

      <section className="dashboard-content">
        <button onClick={goToDashboard}>← Back to Search</button>

        <div className="drug-result-card">
          <h2>{drugName || "Medication Name"}</h2>

          <p><strong>Purpose:</strong> Used to treat...</p>

          <p><strong>Dosage:</strong> Take as directed by your healthcare provider.</p>

          <p><strong>Warnings:</strong> Read all medication instructions before use.</p>

          <p><strong>Side Effects:</strong> Nausea, headache, dizziness.</p>

          <button onClick={goToSavedDrugs}>
            Save Drug
          </button>
        </div>
      </section>
    </main>
  );
}

export default DrugResults;