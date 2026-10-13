const REVEAL_STEP_SECONDS = 0.08;

export const getRevealStyle = (index, stepSeconds = REVEAL_STEP_SECONDS) => ({
  '--reveal-delay': `${index * stepSeconds}s`,
});
