export default function App() {
  return (
    <main
      style={{
        backgroundColor: "#07111f",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        <nav
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#4da6ff",
            }}
          >
            Blu's Krew
          </h1>

          <div
            style={{
              display: "flex",
              gap: "32px",
              fontSize: "1rem",
            }}
          >
            <span>Home</span>
            <span>Artists</span>
            <span>Media</span>
            <span>Booking</span>
            <span>Contact</span>
          </div>
        </nav>
      </div>
    </main>
  );
}
