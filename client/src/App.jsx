import "./style.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>India Post Accessibility Audit</h1>
          <p>Analyze websites for accessibility issues and compliance.</p>
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
              placeholder="https://www.indiapost.gov.in"
              aria-label="Website URL"
            />

            <button type="button">
              Run Audit
            </button>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <span>Accessibility Score</span>
            <strong>--</strong>
          </div>

          <div className="stat-card">
            <span>Critical Issues</span>
            <strong>--</strong>
          </div>

          <div className="stat-card">
            <span>Warnings</span>
            <strong>--</strong>
          </div>

          <div className="stat-card">
            <span>Checks Completed</span>
            <strong>--</strong>
          </div>
        </section>

        <section className="results-card">
          <div className="section-header">
            <div>
              <h2>Audit Results</h2>
              <p>Accessibility findings will appear here.</p>
            </div>
          </div>

          <div className="empty-state">
            <div className="empty-icon">♿</div>
            <h3>No audit results yet</h3>
            <p>
              Enter a website URL above and run your first accessibility audit.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
