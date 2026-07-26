function Signup() {
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

        <button>Sign Up</button>

        <p>
          Already have an account? <a href="/">Log in</a>
        </p>
      </section>
    </main>
  );
}

export default Signup;