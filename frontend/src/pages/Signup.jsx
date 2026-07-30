import { useState } from "react"
function Signup({ goToLogin, goToDashboard }) {

  const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
  });

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
    }
    if (!formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password
    ) {
        alert("Please fill out all fields.");
        return;
    }

    const response = await fetch("http://localhost:5000/register", { //change path when hosting
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        })
    });

    if (response.ok) {
      goToDashboard();
    } else {
      const errorData = await response.json().catch(() => ({}));
      alert(errorData.message || "Registration failed. Please try again.");
    }

  }

  return (
    <main className="signup-page">
      <section className="signup-card">
        <h1>Create Your Account</h1>
        <p>Sign up to get started with MediClear</p>

        <input type="text" placeholder="First name" 
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <input type="text" placeholder="Last name" 
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <input type="email" placeholder="Email" 
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <input type="password" placeholder="Password" 
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          />
        <input type="password" placeholder="Confirm password" 
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          />

        <button type="button" onClick={
          handleSignup
          }>
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