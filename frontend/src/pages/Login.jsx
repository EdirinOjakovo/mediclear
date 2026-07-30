import { useState } from "react"
function Login({ goToSignup, goToDashboard }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!formData.email ||
        !formData.password
    ) {
        alert("Please fill out all fields.");
        return;
    }

    const response = await fetch("http://localhost:5000/login", { //change path when hosting
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
    });

    if (response.ok) {
      goToDashboard();
    } else {
      const errorData = await response.json().catch(() => ({}));
      alert(errorData.message || "Login failed. Please try again.");
    }

  }



  return (
    <main className="signup-page">
      <section className="signup-card">
        <h1>Welcome Back!</h1>
        <p>Log in to continue to MediClear</p>

        <input type="email" placeholder="Enter your email" 
        value={formData.email}
        onChange={(e) =>
            setFormData({
                ...formData,
                email: e.target.value
            })
        }/>
        <input type="password" placeholder="Enter your password" 
        value={formData.password}
        onChange={(e) =>
            setFormData({
                ...formData,
                password: e.target.value
            })
        }/>

        <button
          type="button"
          onClick={handleLogin}
        >
          Log In
        </button>

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