function Signup({ goToLogin, goToDashboard }) {
  return (
    <main className="signup-page">
      <section className="signup-card">
        <h1>Create Your Account</h1>
        <p>Sign up to get started with MediClear</p>

        <input type="text" placeholder="First name" />
        <input type="text" placeholder="Last name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm password" />

        <button type="button" onClick={goToDashboard}>
          Create Account
        </button>

        <p>
          Already have an account?{" "}
          <button
            type="button"
            onClick={goToLogin}
            style={{
              background: "none",
              border: "none",
              color: "#5b4df5",
              cursor: "pointer",
              padding: 0,
              fontSize: "inherit",
            }}
          >
            Log In
          </button>
        </p>
      </section>
    </main>
  );
}

export default Signup;