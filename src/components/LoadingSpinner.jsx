function LoadingSpinner({ city }) {
  return (
    <div style={styles.wrap}>
      <div style={styles.spinner} />
      <p style={styles.text}>Crafting your perfect {city} itinerary...</p>
      <p style={styles.sub}>This may take a few seconds</p>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
  },
  spinner: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "3px solid #bfdbfe",
    borderTop: "3px solid #1a56db",
    animation: "spin 0.8s linear infinite",
    marginBottom: 20,
  },
  text: {
    color: "#1e3a8a",
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 6,
  },
  sub: {
    color: "#3b82f6",
    fontSize: 13,
  },
};

export default LoadingSpinner;