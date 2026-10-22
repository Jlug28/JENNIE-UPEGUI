import confetti from 'canvas-confetti';

/**
 * Triggers a celebratory confetti animation using SENA institutional colors
 * (SENA Green #39A900, Emerald, Golden Amber and White).
 */
export const triggerCelebration = (intensity: 'subtle' | 'standard' | 'grand' = 'standard') => {
  try {
    const senaColors = ['#39A900', '#22c55e', '#facc15', '#ffffff', '#15803d'];

    if (intensity === 'subtle') {
      confetti({
        particleCount: 35,
        spread: 45,
        origin: { y: 0.7 },
        colors: senaColors,
        ticks: 200,
        gravity: 1.2,
      });
      return;
    }

    if (intensity === 'grand') {
      // Multi-cannon burst for major milestones (certificate / all completed)
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        colors: senaColors,
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
      return;
    }

    // Standard burst for completing a module or dilemma
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.65 },
      colors: senaColors,
      ticks: 250,
      scalar: 1.1,
    });
  } catch (err) {
    // Non-critical if canvas is restricted
    console.debug('Confetti could not be triggered', err);
  }
};
