interface Player {
    phoneNumber: string;
    subscribed: boolean;
    luckyNumbers: number[];
  }
  
  // Step 1: Generate an array of 5000 players with random data.
  function generatePlayersArray(): Player[] {
    const players: Player[] = [];
    const usedPhoneNumbers = new Set<string>();
  
    while (players.length < 5000) {
      const phoneNumber = `234${Math.floor(100000000000 + Math.random() * 900000000000)}`;
      if (!usedPhoneNumbers.has(phoneNumber)) {
        usedPhoneNumbers.add(phoneNumber);
        const subscribed = Math.random() < 0.5; // 50% chance of being subscribed
        const luckyNumbers = generateUniqueRandomNumbers(5, 1, 99);
        players.push({ phoneNumber, subscribed, luckyNumbers });
      }
    }
  
    return players;
  }
  
  // Utility function to generate an array of unique random numbers.
  function generateUniqueRandomNumbers(count: number, min: number, max: number): number[] {
    const numbers = new Set<number>();
    while (numbers.size < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(randomNumber);
    }
    return [...numbers];
  }
  
  // Step 2: Determine eligible players and create pools.
  function createPools(players: Player[]) {
    const eligiblePlayers = players.filter(player => player.subscribed === true);
    const pools: Player[][] = [];
    while (eligiblePlayers.length >= 1000) {
      const pool = eligiblePlayers.splice(0, 1000);
      pools.push(pool);
    }
    return { eligiblePlayers, pools };
  }
  
  // Step 3: Determine eligible players that did not make up a complete pool.
  function getIncompletePool(players: Player[]) {
    return players.filter(player => player.subscribed === true);
  }
  
  // Step 4: Process each pool.
  function processPools(pools: Player[][]) {
    const results = [];
  
    for (const pool of pools) {
      let totalAmountGenerated = pool.length * 1000;
      let totalAmountWon = (totalAmountGenerated * 0.5);
  
      let winners: Player[] = [];
      let trials = 0;
  
      while (winners.length === 0) {
        const winningNumber = Math.floor(Math.random() * 99) + 1;
        winners = pool.filter(player => player.luckyNumbers.includes(winningNumber));
        trials++;
      }
  
      const prizePerWinner = totalAmountWon / winners.length;
  
      results.push({
        totalAmountGenerated,
        totalAmountWon,
        winners,
        trials,
        prizePerWinner,
      });
    }
  
    return results;
  }
  
  // Usage
  const players = generatePlayersArray();
  const { eligiblePlayers, pools } = createPools(players);
  const incompletePool = getIncompletePool(eligiblePlayers);
  const poolResults = processPools(pools);
  
  console.log("Eligible Players:", eligiblePlayers.length);
  console.log("Incomplete Pool:", incompletePool.length);
  console.log("Number of Pools:", pools.length);
  console.log("Pool Results:", poolResults);
  