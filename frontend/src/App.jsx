import "./App.css";

function App() {
  return (
    <div className="login-page">
      <header className="topbar">
        <h1>MediClear</h1>
        <nav>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main className="login-content">
        <section className="brand-section">
          <div className="logo">✚</div>
          <h2>MediClear</h2>
          <p>Search. Understand. Save.</p>
        </section>

        <form className="login-card">
          <h2>Welcome Back!</h2>
          <p>Log in to continue to MediClear</p>

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Log In</button>

          <p className="signup-text">
            Don’t have an account? <a href="#">Sign up</a>
          </p>
        </form>
      </main>
    </div>
  );
}

export default App;