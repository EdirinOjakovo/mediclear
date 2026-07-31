import { useState } from "react";

function DrugResults({ drugName, goToDashboard, goToSavedDrugs }) {
  const openfda = drugName?.openfda || {};

  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const saveDrug = () => {
    const savedDrugs =
      JSON.parse(localStorage.getItem("savedDrugs")) || [];

    const alreadySaved = savedDrugs.some(
      (savedDrug) =>
        JSON.stringify(savedDrug) === JSON.stringify(drugName)
    );

    if (!alreadySaved) {
      savedDrugs.push(drugName);

      localStorage.setItem(
        "savedDrugs",
        JSON.stringify(savedDrugs)
      );

      alert("Drug saved!");
    } else {
      alert("This drug is already saved.");
    }
  }

  const getReadableSummary = async () => {
    setLoadingSummary(true);

    try {
      const response = await fetch("http://localhost:5000/ai-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drugData: drugName,
        }),
      });

      const data = await response.json();

      setSummary(data.summary);
      setShowSummary(true);
    } catch (error) {
      console.error(error);
      alert("Unable to generate AI summary.");
    }

    setLoadingSummary(false);
  };

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
        <h2>{openfda.generic_name?.[0] || "Unknown Drug"}</h2>

        <p>
          <strong>Brand Name:</strong>{" "}
          {openfda.brand_name?.[0] || "Unknown"}
        </p>

        <p>
          <strong>Manufacturer:</strong>{" "}
          {openfda.manufacturer_name?.[0] || "Unknown"}
        </p>

        <p>
          <strong>Purpose:</strong>{" "}
          {drugName?.purpose?.[0] || "Not available"}
        </p>

        <p>
          <strong>Indications:</strong>{" "}
          {drugName?.indications_and_usage?.[0] || "Not available"}
        </p>

        <p>
          <strong>Dosage:</strong>{" "}
          {drugName?.dosage_and_administration?.[0] || "Not available"}
        </p>

        <p>
          <strong>Warnings:</strong>{" "}
          {drugName?.warnings?.[0] || "Not available"}
        </p>

        <p>
          <strong>Adverse Reactions:</strong>{" "}
          {drugName?.adverse_reactions?.[0] || "Not available"}
        </p>

        <button
          onClick={getReadableSummary}
          disabled={loadingSummary}
        >
          {loadingSummary
            ? "Generating..."
            : "✨ Simplify"}
        </button>

        {showSummary && (
          <div className="ai-summary">
            <h3>AI Patient-Friendly Summary</h3>

            <p>{summary}</p>

            <button
              onClick={() => setShowSummary(false)}
            >
              Hide Summary
            </button>
          </div>
        )}

        <br />


        <button onClick={saveDrug}>
          Save Drug
        </button>
      </section>
    </main>
  );
}

export default DrugResults;