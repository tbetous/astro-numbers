// Utility function to generate a seed based on the current day
const getDailySeed = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

// Simple seeded random number generator based on linear congruential generator
// Since sequence will be short, we can use a simple LCG
const seededRandom = (seed: string) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return () => {
    hash = (hash * 9301 + 49297) % 233280;
    return Math.abs(hash / 233280);
  };
};

// Generate the daily answer
export const generateDailyAnswer = (answerLength: number) => {
  const seed = getDailySeed();
  const random = seededRandom(seed);
  return Array.from({ length: answerLength }, () => Math.floor(random() * 10));
};
