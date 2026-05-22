import React, { useState, useEffect } from 'react';

// The component to be displayed after the interval
function DelayedComponent() {
  return (
    <div className="delayed-component">
      <h3>🎉 Component Displayed!</h3>
      <p>This component was rendered after a 3-second delay using the <code>useEffect</code> hook.</p>
    </div>
  );
}

export default function App() {
  const [showComponent, setShowComponent] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [resetKey, setResetKey] = useState(0); // Trigger state to restart the timer

  // Effect 1: Show the component after 3 seconds
  useEffect(() => {
    setShowComponent(false);
    setCountdown(3);

    const timer = setTimeout(() => {
      setShowComponent(true);
    }, 3000);

    // Cleanup: Clear the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, [resetKey]);

  // Effect 2: Tick the countdown every second (3 → 2 → 1)
  useEffect(() => {
    if (showComponent || countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Cleanup: Clear the interval
    return () => clearInterval(interval);
  }, [countdown, showComponent]);

  return (
    <div className="assignment-card">
      <h2>Delayed Display Assignment</h2>
      <p className="assignment-sub">Demonstrating component rendering after a 3-second interval.</p>
      
      <div className="display-area">
        {showComponent ? (
          <DelayedComponent />
        ) : (
          <p className="loading-text">Loading component in {countdown} seconds...</p>
        )}
      </div>

      <button className="restart-btn" onClick={() => setResetKey(prev => prev + 1)}>
        🔄 Restart Timer
      </button>
    </div>
  );
}
