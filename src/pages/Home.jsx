import { useState, useEffect } from "react";
import CitySelector from "../components/CitySelector";
import ItineraryCard from "../components/ItineraryCard";
import MapView from "../components/MapView";
import LoadingSpinner from "../components/LoadingSpinner";
import { generateItinerary } from "../services/api";
import { parseItinerary } from "../utils/parseItinerary";

const CITY_IMAGES = {
  Bangalore: [
    "/images/blr1.jpg",
    "/images/blr2.jpg",
    "/images/blr3.jpg",
    "/images/blr4.jpg",
    "/images/blr5.jpg",
    "/images/blr6.jpg",
  ],

  Chennai: [
    "/images/ch1.jpg",
    "/images/ch2.jpg",
    "/images/ch3.jpg",
    "/images/ch4.jpg",
    "/images/ch5.jpg",
    "/images/ch6.jpg",
  ],

  Delhi: [
    "/images/del1.jpg",
    "/images/del2.jpg",
    "/images/del3.jpg",
    "/images/del4.jpg",
    "/images/del5.jpg",
    "/images/del6.jpg",
  ],

  Goa: [
    "/images/goa1.jpg",
    "/images/goa2.jpg",
    "/images/goa3.jpg",
    "/images/goa4.jpg",
    "/images/goa5.jpg",
    "/images/goa6.jpg",
  ],

  Hyderabad: [
    "/images/hyd1.jpg",
    "/images/hyd2.jpg",
    "/images/hyd3.jpg",
    "/images/hyd4.jpg",
    "/images/hyd5.jpg",
    "/images/hyd6.jpg",
  ],

  Jaipur: [
    "/images/jai1.jpg",
    "/images/jai2.jpg",
    "/images/jai3.jpg",
    "/images/jai4.jpg",
  ],

  Kolkata: [
    "/images/kol1.jpg",
    "/images/kol2.jpg",
    "/images/kol3.jpg",
    "/images/kol4.jpg",
    "/images/kol5.jpg",
    "/images/kol6.jpg",
  ],

  Manali: [
    "/images/man1.jpg",
    "/images/man2.jpg",
    "/images/man3.jpg",
    "/images/man4.jpg",
  ],

  Mumbai: [
    "/images/mum1.jpg",
    "/images/mum2.jpg",
    "/images/mum3.jpg",
    "/images/mum4.jpg",
    "/images/mum5.jpg",
  ],

  Udaipur: [
    "/images/udai1.jpg",
    "/images/udai2.jpg",
    "/images/udai3.jpg",
  ],
};
function CityBanner({ city }) {
  const images = CITY_IMAGES[city] || CITY_IMAGES["Bangalore"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={styles.bannerWrap}>
      <div
        style={{
          ...styles.bannerImg,
          backgroundImage: `url(${images[currentIndex]})`,
          opacity: fade ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      />
      <div style={styles.bannerOverlay} />
      <div style={styles.bannerContent}>
        <h2 style={styles.resultTitle}>Your {city} Itinerary</h2>
        <div style={styles.dots}>
          {images.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                background: i === currentIndex ? "#ffffff" : "#ffffff55",
                width: i === currentIndex ? 20 : 8,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [city, setCity] = useState("");
  const [vibe, setVibe] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  const bgImages = result ? (CITY_IMAGES[result.city] || CITY_IMAGES["Bangalore"]) : [];

  useEffect(() => {
    if (!result) return;
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [result, bgImages.length]);

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setResult(null);
    setBgIndex(0);
    try {
      const data = await generateItinerary(city, vibe, duration);
      const parsed = parseItinerary(data);
      setResult({ ...parsed, city, vibe, duration });
    } catch (e) {
      setError("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setCity("");
    setVibe("");
    setDuration("");
    setError("");
    setBgIndex(0);
  }

  return (
    <div
      style={{
        ...styles.app,
        ...(result && bgImages[bgIndex]
          ? {
              backgroundImage: `url(${bgImages[bgIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }
          : {}),
      }}
    >
      {result && <div style={styles.bgOverlay} />}

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Hero */}
        <div style={styles.hero}>
          <div style={styles.heroInner}>
            <div style={styles.badge}>🗺️ Wanderer</div>
            <h1 style={styles.h1}>Wander Smarter,<br />Not Harder</h1>
            <p style={styles.sub}>
              Pick a city, pick your vibe — get a full personalised
              itinerary crafted just for you in seconds.
            </p>
          </div>
        </div>

        {/* Form */}
        {!result && !loading && (
          <div style={styles.formSection}>
            <CitySelector
              city={city} setCity={setCity}
              vibe={vibe} setVibe={setVibe}
              duration={duration} setDuration={setDuration}
              onGenerate={handleGenerate}
              loading={loading}
            />
            {error && <div style={styles.errorBox}>{error}</div>}
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingSpinner city={city} />}

        {/* Result */}
        {result && !loading && (
          <div style={styles.resultSection}>

            <CityBanner city={result.city} />

            <p style={styles.resultSub}>
              {result.vibe} · {result.duration}
            </p>

            {result.overview && (
              <div style={styles.overviewBox}>
                💡 {result.overview}
              </div>
            )}

            <MapView stops={result.stops} />

            {result.stops.map((stop) => (
              <ItineraryCard key={stop.index} stop={stop} />
            ))}

            <button style={styles.resetBtn} onClick={handleReset}>
              ← Plan Another Trip
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #ffffff 0%, #e8f0fe 40%, #c7d9fd 100%)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    paddingBottom: 60,
    transition: "background-image 1s ease-in-out",
  },
  bgOverlay: {
    position: "fixed",
    inset: 0,
    background: "linear-gradient(160deg, #ffffffcc 0%, #e8f0fecc 40%, #c7d9fdcc 100%)",
    zIndex: 0,
  },
  hero: {
    background: "linear-gradient(135deg, #1a56db 0%, #3b82f6 50%, #60a5fa 100%)",
    padding: "60px 24px 50px",
    textAlign: "center",
    boxShadow: "0 4px 24px #1a56db33",
  },
  heroInner: {
    maxWidth: 600,
    margin: "0 auto",
  },
  badge: {
    display: "inline-block",
    background: "#ffffff22",
    border: "1px solid #ffffff44",
    color: "#ffffff",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1,
    padding: "5px 16px",
    marginBottom: 20,
  },
  h1: {
    fontSize: "clamp(32px, 6vw, 54px)",
    fontWeight: 900,
    color: "#ffffff",
    margin: "0 0 16px",
    lineHeight: 1.1,
    textShadow: "0 2px 12px #1a56db55",
  },
  sub: {
    color: "#dbeafe",
    fontSize: 16,
    lineHeight: 1.7,
    maxWidth: 440,
    margin: "0 auto",
  },
  formSection: {
    maxWidth: 760,
    margin: "40px auto 0",
    background: "#ffffffee",
    borderRadius: 20,
    boxShadow: "0 4px 32px #1a56db11",
    padding: "32px 28px",
  },
  errorBox: {
    background: "#fee2e2",
    border: "1px solid #fca5a5",
    borderRadius: 10,
    padding: "14px 20px",
    color: "#dc2626",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
  },
  resultSection: {
    maxWidth: 760,
    margin: "40px auto 0",
    padding: "0 20px",
  },
  bannerWrap: {
    position: "relative",
    height: 240,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    boxShadow: "0 4px 24px #1a56db33",
  },
  bannerImg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(1px) brightness(0.55)",
    transform: "scale(1.05)",
  },
  bannerOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, #1a56db33, #1e3a8a88)",
  },
  bannerContent: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  resultTitle: {
    fontSize: 34,
    fontWeight: 900,
    color: "#ffffff",
    textShadow: "0 2px 16px #00000066",
    margin: 0,
    textAlign: "center",
    letterSpacing: "-0.5px",
  },
  dots: {
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  dot: {
    height: 8,
    borderRadius: 999,
    transition: "all 0.3s ease",
  },
  resultSub: {
    fontSize: 14,
    color: "#1e40af",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 8,
  },
  overviewBox: {
    background: "#ffffffdd",
    border: "1px solid #bfdbfe",
    borderRadius: 12,
    padding: "16px 20px",
    marginBottom: 24,
    fontSize: 14,
    color: "#1e40af",
    lineHeight: 1.7,
    boxShadow: "0 2px 12px #1a56db11",
    backdropFilter: "blur(8px)",
  },
  resetBtn: {
    background: "#ffffffdd",
    border: "1px solid #93c5fd",
    color: "#1a56db",
    padding: "10px 24px",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
    display: "block",
    margin: "28px auto 0",
    fontWeight: 600,
    backdropFilter: "blur(8px)",
  },
};

export default Home;