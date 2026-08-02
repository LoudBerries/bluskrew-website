export default function App() {
  return (
    <main
      style={{
        backgroundColor: "#0b1020",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
      }}
    >
      <header style={{ marginBottom: "60px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
          Blu's Krew Media
        </h1>

        <p style={{ fontSize: "1.25rem", color: "#8fb8ff" }}>
          Built Through Pressure.
        </p>

        <p style={{ maxWidth: "700px", lineHeight: "1.7" }}>
          Music. Media. Events. Storytelling.
          We create opportunities for independent artists through
          professional content, live experiences, and innovative promotion.
        </p>
      </header>

      <section style={{ marginBottom: "40px" }}>
        <h2>Featured Brands</h2>

        <ul>
          <li>Blu's Krew TV</li>
          <li>Blu Chek</li>
          <li>TEEM Blu Rekords</li>
          <li>Live Events</li>
        </ul>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Featured Artists</h2>

        <ul>
          <li>Karson Blu</li>
          <li>KT Mello</li>
          <li>Jay2X</li>
          <li>Lonnie 808</li>
        </ul>
      </section>

      <section>
        <h2>Coming Soon</h2>

        <p>
          This website is being rebuilt from the ground up using React,
          GitHub, and Netlify.
        </p>
      </section>
    </main>
  );
}