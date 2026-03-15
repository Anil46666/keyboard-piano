import { useEffect, useRef, useState } from "react";
import Piano from "./components/piano.js";
import "./App.css";

const TRANSITION_MS = 380;

function App() {
  const [activeScreen, setActiveScreen] = useState("landing");
  const [nextScreen, setNextScreen] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const transitionTo = (targetScreen) => {
    if (isAnimating || activeScreen === targetScreen) return;

    setNextScreen(targetScreen);
    setIsAnimating(true);

    timerRef.current = setTimeout(() => {
      setActiveScreen(targetScreen);
      setNextScreen(null);
      setIsAnimating(false);
      timerRef.current = null;
    }, TRANSITION_MS);
  };

  const isLandingVisible = activeScreen === "landing" || nextScreen === "landing";
  const isStageVisible = activeScreen === "stage" || nextScreen === "stage";

  const landingClasses = [
    "screen-layer",
    "landing-page",
    activeScreen === "landing" && !isAnimating ? "is-active" : "",
    activeScreen === "landing" && nextScreen === "stage" ? "is-exiting" : "",
    activeScreen === "stage" && nextScreen === "landing" ? "is-entering" : "",
    !isLandingVisible ? "is-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const stageClasses = [
    "screen-layer",
    "stage-page",
    activeScreen === "stage" && !isAnimating ? "is-active" : "",
    activeScreen === "stage" && nextScreen === "landing" ? "is-exiting" : "",
    activeScreen === "landing" && nextScreen === "stage" ? "is-entering" : "",
    !isStageVisible ? "is-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="app-shell">
      <main className={landingClasses}>
        <div className="landing-bg" aria-hidden="true">
          <span className="orb orb-one" />
          <span className="orb orb-two" />
          <span className="orb orb-three" />
          <span className="staff staff-one" />
          <span className="staff staff-two" />
        </div>

        <section className="hero-card">
          <p className="hero-kicker">Anykeyboard Piano Studio</p>
          <h1>Play melodies from your keyboard in seconds.</h1>
          <p className="hero-subtitle">
            Press the start button, then use your keyboard letters to perform
            notes with smooth key animations and real piano samples.
          </p>

          <button
            type="button"
            className="start-btn"
            onClick={() => transitionTo("stage")}
            disabled={isAnimating}
          >
            Start Playing
          </button>

          <p className="hero-tip">Tip: Works on desktop and mobile tap.</p>
        </section>
      </main>

      <main className={stageClasses}>
        <header className="stage-header">
          <h2>Anykeyboard Piano</h2>
          <button
            type="button"
            className="back-btn"
            onClick={() => transitionTo("landing")}
            disabled={isAnimating}
          >
            Back to Landing
          </button>
        </header>

        <section className="stage-content">
          <Piano />
        </section>
      </main>
    </div>
  );
}

export default App;