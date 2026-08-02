const CITIES = [
  "Bangalore", "Mumbai", "Delhi", "Goa", "Jaipur",
  "Kolkata", "Chennai", "Hyderabad", "Udaipur", "Manali"
];

const VIBES = [
  { id: "Explorer", label: "🗺️ Explorer", desc: "Hidden gems & offbeat spots" },
  { id: "Foodie", label: "🍛 Foodie", desc: "Local eats & street food" },
  { id: "Culture & History", label: "🏛️ Culture & History", desc: "Museums, temples & heritage" },
  { id: "Chill & Cafés", label: "☕ Chill & Cafés", desc: "Slow mornings & cozy spots" },
  { id: "Nightlife", label: "🌙 Nightlife", desc: "Bars, music & evening scene" },
];

const DURATIONS = ["Half Day (4 hrs)", "Full Day (8 hrs)", "Weekend (2 Days)"];

function CitySelector({ city, setCity, vibe, setVibe, duration, setDuration, onGenerate, loading }) {
  const canGenerate = city && vibe && duration && !loading;

  return (
    <div style={styles.wrap}>

      {/* City */}
      <div style={styles.section}>
        <span style={styles.label}>Choose a City</span>
        <div style={styles.cityGrid}>
          {CITIES.map((c) => (
            <button
              key={c}
              style={{
                ...styles.cityBtn,
                border: `1.5px solid ${city === c ? "#6c63ff" : "#1e2538"}`,
                background: city === c ? "#6c63ff22" : "#141824",
                color: city === c ? "#6c63ff" : "#e8eaf6",
                fontWeight: city === c ? 700 : 400,
              }}
              onClick={() => setCity(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Vibe */}
      <div style={styles.section}>
        <span style={styles.label}>What's Your Vibe?</span>
        <div style={styles.vibeGrid}>
          {VIBES.map((v) => (
            <div
              key={v.id}
              style={{
                ...styles.vibeCard,
                border: `1.5px solid ${vibe === v.id ? "#6c63ff" : "#1e2538"}`,
                background: vibe === v.id ? "#6c63ff22" : "#141824",
              }}
              onClick={() => setVibe(v.id)}
            >
              <div style={{
                ...styles.vibeLabel,
                color: vibe === v.id ? "#6c63ff" : "#e8eaf6",
              }}>
                {v.label}
              </div>
              <div style={styles.vibeDesc}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div style={styles.section}>
        <span style={styles.label}>Duration</span>
        <div style={styles.durationRow}>
          {DURATIONS.map((d) => (
            <button
              key={d}
              style={{
                ...styles.durBtn,
                border: `1.5px solid ${duration === d ? "#6c63ff" : "#1e2538"}`,
                background: duration === d ? "#6c63ff22" : "#141824",
                color: duration === d ? "#6c63ff" : "#e8eaf6",
                fontWeight: duration === d ? 700 : 400,
              }}
              onClick={() => setDuration(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        style={{
          ...styles.genBtn,
          background: canGenerate
            ? "linear-gradient(135deg, #6c63ff, #9b5de5)"
            : "#1e2538",
          color: canGenerate ? "#fff" : "#8892b0",
          cursor: canGenerate ? "pointer" : "not-allowed",
        }}
        onClick={canGenerate ? onGenerate : undefined}
        disabled={!canGenerate}
      >
        {loading ? "Generating..." : "✨ Generate My Itinerary"}
      </button>

    </div>
  );
}

const styles = {
  wrap: { maxWidth: 720, margin: "0 auto", padding: "0 20px" },
  section: { marginBottom: 28 },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    color: "#3b82f6",
    textTransform: "uppercase",
    marginBottom: 12,
    textAlign: "center",
  },
  cityGrid: { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" },
  cityBtn: {
    padding: "8px 16px",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.15s",
    background: "#ffffff",
    color: "#1e3a8a",
  },
  vibeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 10,
  },
  vibeCard: {
    padding: "14px 12px",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.15s",
    background: "#ffffff",
  },
  vibeLabel: { fontSize: 14, fontWeight: 700, marginBottom: 4 },
  vibeDesc: { fontSize: 11, color: "#64748b" },
  durationRow: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" },
  durBtn: {
    padding: "8px 18px",
    borderRadius: 8,
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.15s",
    background: "#ffffff",
    color: "#1e3a8a",
  },
  genBtn: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    border: "none",
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 0.5,
    transition: "all 0.2s",
    marginTop: 8,
    boxShadow: "0 4px 16px #1a56db33",
  },
};

export default CitySelector;