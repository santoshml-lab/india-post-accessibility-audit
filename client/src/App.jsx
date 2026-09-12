import { useState } from "react";
import { runAccessibilityAudit } from "./api";
import "./style.css";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAudit = async () => {
    if (!url.trim()) {
      setError("Please enter a website URL.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await runAccessibilityAudit(url.trim());
      setResult(data);
    } catch (err) {
      setError(err.message || "Audit failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>India Post Accessibility Audit</h1>
          <p>
            Analyze websites for accessibility issues and compliance.
          </p>
        </div>

        <div className="status">
          ● Audit System Ready
        </div>
      </header>

      <main>
        <section className="audit-card">
          <h2>Start Accessibility Audit</h2>

          <p className="description">
            Enter a webpage URL to analyze its accessibility.
          </p>

          <div className="audit-form">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.indiapost.gov.in"
              aria-label="Website URL"
            />

            <button
              type="button"
              onClick={handleAudit}
              disabled={loading}
            >
              {loading ? "Auditing..." : "Run Audit"}
            </button>
          </div>

          {error && <p className="error">{error}</p>}
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Accessibility Score</span>
            <strong>
              {result ? `${result.score}%` : "--"}
            </strong>
          </div>

          <div className="stat-card">
            <span>Issues Found</span>
            <strong>
              {result ? result.summary.issues_found : "--"}
            </strong>
          </div>

          <div className="stat-card">
            <span>Images Checked</span>
            <strong>
              {result ? result.summary.images_checked : "--"}
            </strong>
          </div>

          <div className="stat-card">
            <span>Headings Found</span>
            <strong>
              {result ? result.summary.headings_found : "--"}
            </strong>
          </div>
        </section>

        <section className="results-card">
          <div className="section-header">
            <div>
              <h2>Audit Results</h2>
              <p>
                {result
                  ? `Results for ${result.url}`
                  : "Accessibility findings will appear here."}
              </p>
            </div>
          </div>

          {!result && !loading && (
            <div className="empty-state">
              <div className="empty-icon">♿</div>
              <h3>No audit results yet</h3>
              <p>
                Enter a website URL above and run your first
                accessibility audit.
              </p>
            </div>
          )}

          {loading && (
            <div className="empty-state">
              <div className="empty-icon">⏳</div>
              <h3>Running accessibility audit...</h3>
              <p>
                The system is checking the webpage.
              </p>
            </div>
          )}

          {result && (
            <div className="issues-list">
              {result.issues.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✅</div>
                  <h3>No issues detected</h3>
                  <p>
                    The basic accessibility checks passed.
                  </p>
                </div>
              ) : (
                result.issues.map((issue, index) => (
                  <div className="issue" key={index}>
                    <div>
                      <h3>{issue.type}</h3>
                      <p>{issue.message}</p>
                    </div>

                    <span className="severity">
                      {issue.severity}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
