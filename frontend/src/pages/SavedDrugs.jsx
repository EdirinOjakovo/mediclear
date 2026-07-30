import { useState } from "react";

function SavedDrugs({ goToDashboard, goToResults }) {
  const [savedDrugs, setSavedDrugs] = useState(() => {
    const storedDrugs = localStorage.getItem("savedDrugs");
    return storedDrugs ? JSON.parse(storedDrugs) : [];
  });

  const deleteDrug = (indexToDelete) => {
    const updatedDrugs = savedDrugs.filter(
      (_, index) => index !== indexToDelete
    );

    setSavedDrugs(updatedDrugs);
    localStorage.setItem("savedDrugs", JSON.stringify(updatedDrugs));
  };

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

        {savedDrugs.length === 0 ? (
          <p>You have not saved any drugs yet.</p>
        ) : (
          <div className="saved-list">
            {savedDrugs.map((drug, index) => {
              const genericName =
                drug.generic_name ||
                drug.openfda?.generic_name?.[0] ||
                "Unknown drug";

              const brandName =
                drug.brand_name ||
                drug.openfda?.brand_name?.[0] ||
                "Unknown brand";

              return (
                <div className="saved-drug-card" key={index}>
                  <h3>{genericName}</h3>
                  <p>Brand: {brandName}</p>

                  <div>
                    <button onClick={() => goToResults(drug)}>
                      View
                    </button>

                    <button onClick={() => deleteDrug(index)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default SavedDrugs;