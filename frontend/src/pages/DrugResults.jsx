import { useState } from "react";

function annotateText(rawText, highlights, sectionKey) {
  if (!rawText) return [{ type: "text", content: rawText }];

  const relevant = (highlights || []).filter(
    (h) => h.section === sectionKey && h.exact_text && rawText.includes(h.exact_text)
  );
  if (relevant.length === 0) return [{ type: "text", content: rawText }];

  let matches = [];
  relevant.forEach((h) => {
    let idx = rawText.indexOf(h.exact_text);
    while (idx !== -1) {
      matches.push({ start: idx, end: idx + h.exact_text.length, data: h });
      idx = rawText.indexOf(h.exact_text, idx + 1);
    }
  });

  matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
  const clean = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      clean.push(m);
      lastEnd = m.end;
    }
  }

  const parts = [];
  let cursor = 0;
  clean.forEach((m, i) => {
    if (m.start > cursor) {
      parts.push({ type: "text", content: rawText.slice(cursor, m.start) });
    }
    parts.push({
      type: "highlight",
      content: rawText.slice(m.start, m.end),
      data: m.data,
      key: `h-${sectionKey}-${i}`,
    });
    cursor = m.end;
  });
  if (cursor < rawText.length) {
    parts.push({ type: "text", content: rawText.slice(cursor) });
  }

  return parts;
}

function AnnotatedParagraph({ text, highlights, sectionKey, onTermClick }) {
  const parts = annotateText(text, highlights, sectionKey);

  return (
    <p>
      {parts.map((part, i) =>
        part.type === "highlight" ? (
          <mark
            key={part.key}
            className={`hl hl-${part.data.severity || "info"}`}
            title={part.data.definition}
            onClick={() => onTermClick(part.data)}
          >
            {part.content}
          </mark>
        ) : (
          <span key={i}>{part.content}</span>
        )
      )}
    </p>
  );
}

function DrugResults({ drugName, goToDashboard, goToSavedDrugs }) {
  const openfda = drugName?.openfda || {};

  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState(null);

  const saveDrug = () => {
    const savedDrugs = JSON.parse(localStorage.getItem("savedDrugs")) || [];

    const alreadySaved = savedDrugs.some(
      (savedDrug) => JSON.stringify(savedDrug) === JSON.stringify(drugName)
    );

    if (!alreadySaved) {
      savedDrugs.push(drugName);
      localStorage.setItem("savedDrugs", JSON.stringify(savedDrugs));
      alert("Drug saved!");
    } else {
      alert("This drug is already saved.");
    }
  };

  const getReadableSummary = async () => {
    setLoadingSummary(true);

    try {
      const response = await fetch("http://localhost:5000/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drugData: drugName }),
      });

      const data = await response.json();
      const ai = data.summary;  

      setSummary(ai);
      setShowSummary(true);
    } catch (error) {
      console.error(error);
      alert("Unable to generate AI summary.");
    }

    setLoadingSummary(false);
  };

 
  const highlights = summary?.highlights || [];

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
          <strong>Brand Name:</strong> {openfda.brand_name?.[0] || "Unknown"}
        </p>
        <p>
          <strong>Manufacturer:</strong>{" "}
          {openfda.manufacturer_name?.[0] || "Unknown"}
        </p>

        <strong>Purpose:</strong>
        <AnnotatedParagraph
          text={drugName?.purpose?.[0] || "Not available"}
          highlights={highlights}
          sectionKey="purpose"
          onTermClick={setActiveHighlight}
        />

        <strong>Indications:</strong>
        <AnnotatedParagraph
          text={drugName?.indications_and_usage?.[0] || "Not available"}
          highlights={highlights}
          sectionKey="indications"
          onTermClick={setActiveHighlight}
        />

        <strong>Dosage:</strong>
        <AnnotatedParagraph
          text={drugName?.dosage_and_administration?.[0] || "Not available"}
          highlights={highlights}
          sectionKey="dosage"
          onTermClick={setActiveHighlight}
        />

        <strong>Warnings:</strong>
        <AnnotatedParagraph
          text={drugName?.warnings?.[0] || "Not available"}
          highlights={highlights}
          sectionKey="warnings"
          onTermClick={setActiveHighlight}
        />

        <strong>Adverse Reactions:</strong>
        <AnnotatedParagraph
          text={drugName?.adverse_reactions?.[0] || "Not available"}
          highlights={highlights}
          sectionKey="adverse_reactions"
          onTermClick={setActiveHighlight}
        />

        <button className ="simplifyButton" onClick={getReadableSummary} disabled={loadingSummary}>
          {loadingSummary ? "Generating..." : "Simplify"}
        </button>

        {showSummary && summary && (
          <div className="ai-summary">
            <h3>Simplified Explanation</h3>

            <h4>Purpose</h4>
            <p>{summary.summary.purpose}</p>

            <h4>How to Take It</h4>
            <p>{summary.summary.dosage}</p>

            <h4>Common Side Effects</h4>
            <p>{summary.summary.side_effects}</p>

            <h4>Warnings</h4>
            <p>{summary.summary.warnings}</p>

            <h4>When to Contact a Doctor</h4>
            <p>{summary.summary.doctor}</p>

            {summary.important_notices?.length > 0 && (
              <div className="important-notices">
                <h4>Key things to know</h4>
                <ul>
                  {summary.important_notices.map((n, i) => (
                    <li key={i} className={`notice notice-${n.severity}`}>
                      <strong>{n.title}</strong>: {n.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeHighlight && (
          <div className="term-explainer">
            <button
              className="term-explainer-close"
              onClick={() => setActiveHighlight(null)}
            >
              ×
            </button>
            <strong>{activeHighlight.term}</strong>
            <p>{activeHighlight.definition}</p>
            <p className="term-reason">{activeHighlight.reason}</p>
          </div>
        )}

        <br />
        <button onClick={saveDrug}>Save Drug</button>
      </section>
    </main>
  );
}

export default DrugResults;