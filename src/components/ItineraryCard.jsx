function ItineraryCard({ stop }) {
  return (
    <div style={styles.card}>
      <div style={styles.indexBadge}>{stop.index}</div>
      <div style={styles.content}>
        <div style={styles.name}>{stop.name}</div>
        {stop.time && <div style={styles.time}>🕐 {stop.time}</div>}
        {stop.desc && <div style={styles.desc}>{stop.desc}</div>}
        {stop.tip && (
          <div style={styles.tip}>
            💡 {stop.tip}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    gap: 16,
    background: "#ffffffee",
    border: "1px solid #bfdbfe",
    borderRadius: 14,
    padding: 20,
    marginBottom: 14,
    boxShadow: "0 2px 12px #1a56db0d",
  },
  indexBadge: {
    minWidth: 36,
    height: 36,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1a56db, #3b82f6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 800,
    color: "#ffffff",
    boxShadow: "0 2px 8px #1a56db33",
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1e3a8a",
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: "#3b82f6",
    fontWeight: 600,
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 1.6,
    marginBottom: 8,
  },
  tip: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 12,
    color: "#1d4ed8",
  },
};

export default ItineraryCard;