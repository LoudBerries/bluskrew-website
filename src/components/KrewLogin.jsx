import { useState } from "react";
import { supabase } from "../supabase";

export default function KrewLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Signed in successfully.");
  };

  return (
    <main className="krew-login-page">
      <section className="krew-login-card">
        <p>BLU'S KREW</p>
        <h1>KREW SIGN IN</h1>
        <p>Artists and Krew members only.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type="submit">SIGN IN</button>
        </form>

        {message && <p>{message}</p>}
      </section>
    </main>
  );
}