function Login({ goToSignup }) {
  return (
    <main className="signup-page">
      <section className="signup-card">
        <h1>Welcome Back!</h1>
        <p>Log in to continue to MediClear</p>

        <input type="email" placeholder="Enter your email" />
        <input type="password" placeholder="Enter your password" />

        <button type="button">Log In</button>

        <p>
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={goToSignup}
            style={{
              background: "none",
              border: "none",
              color: "#5b4df5",
              cursor: "pointer",
              padding: 0,
              fontSize: "inherit",
            }}
          >
            Sign Up
          </button>
        </p>
      </section>
    </main>
  );
}

export default Login;