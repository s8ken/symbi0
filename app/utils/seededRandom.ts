// A simple seeded random number generator
export function seededRandom(seed: number): () => number {
  return () => {
    const x = Math.sin(seed++) * 10000
    return x - Math.floor(x)
  }
}

// Get a consistent set of haikus for a given day
export function getDailyHaikus(haikus: any[], date: Date) {
  // Create a seed based on the year, month, and day
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const seed = year * 10000 + month * 100 + day

  // Create our random function with the seed
  const random = seededRandom(seed)

  // Determine how many haikus to show today (between 5 and 11)
  const count = Math.floor(random() * 7) + 5

  // Shuffle the haikus array using the seeded random function
  const shuffled = [...haikus].sort(() => random() - 0.5)

  // Return the first 'count' haikus
  return {
    haikus: shuffled.slice(0, count),
    count,
  }
}
