// Player data type
type Player = {
    phoneNumber: number;
    subscribed: boolean;
    luckyNumbers: number[];
    balance: number;
  };
  
  // Lottery game state
  type LotteryGame = {
    players: Player[];
    winningNumbers: number[];
    subscriptionFee: number;
  };
  
  // Initialize the lottery game
  function initializeLotteryGame(): LotteryGame {
    return {
      players: [],
      winningNumbers: [],
      subscriptionFee: 1000,
    };
  }
  
  // Player enters the game by paying the subscription fee and choosing their numbers
  function enterGame(game: LotteryGame, player: Player, chosenNumbers: number[]) {
    if (player.subscribed && player.balance >= game.subscriptionFee) {
      if (chosenNumbers.length === 5 && chosenNumbers.every((num) => num >= 1 && num <= 99)) {
        player.balance -= game.subscriptionFee;
        player.luckyNumbers = chosenNumbers;
        game.players.push(player);
        console.log(`${player.phoneNumber} entered the game with numbers: ${chosenNumbers.join(', ')}.`);
      } else {
        console.log(`${player.phoneNumber} must choose exactly 5 numbers between 1 and 99.`);
      }
    } else {
      console.log(`${player.phoneNumber} can't enter the game.`);
    }
  }
  
  // Draw 5 random numbers between 1 and 99 as winning numbers
  function drawWinningNumbers(game: LotteryGame) {
    game.winningNumbers = [];
    while (game.winningNumbers.length < 5) {
      const randomNumber = Math.floor(Math.random() * 99) + 1;
      if (!game.winningNumbers.includes(randomNumber)) {
        game.winningNumbers.push(randomNumber);
      }
    }
    console.log(`Winning Numbers: ${game.winningNumbers}`);
  }
  
  // Determine the winners and award prizes
  function determineWinners(game: LotteryGame) {
    // Ensure there are at least 1000 players in the pool
    if (game.players.length < 1000) {
      console.log("There are not enough players to select winners.");
      return;
    }
  
    // Calculate the total subscription fees collected
    const totalSubscriptionFees = game.players.length * game.subscriptionFee;
  
    // Calculate the maximum prize amount as 50% of the total subscription fees
    const maxPrizeAmount = totalSubscriptionFees * 0.5;
  
    // Randomly select 1000 winners from the pool
    const winners: Player[] = [];
    const shuffledPlayers = shuffleArray(game.players);
  
    for (let i = 0; i < 1000; i++) {
      winners.push(shuffledPlayers[i]);
    }
  
    if (winners.length > 0) {
      // Calculate the prize per winner based on the maximum prize amount
      const prizePerWinner = maxPrizeAmount / winners.length;
  
      winners.forEach((winner) => {
        winner.balance += prizePerWinner;
        console.log(`${winner.phoneNumber} won N${prizePerWinner.toFixed(2)}`);
      });
    } else {
      console.log("No winners this time.");
    }
  }
  
  // Function to shuffle an array randomly
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  // Example usage
const game = initializeLotteryGame();
  
  const player1: Player = {
    phoneNumber: 1234567890,
    subscribed: true,
    luckyNumbers: [],
    balance: 5000,
  };
  
  const player2: Player = {
    phoneNumber: 9876543210,
    subscribed: true,
    luckyNumbers: [],
    balance: 1500,
  };
  
  const player3: Player = {
    phoneNumber: 5555555555,
    subscribed: true,
    luckyNumbers: [],
    balance: 3000,
  };
  
  enterGame(game, player1, [3, 7, 22, 55, 89]);
  enterGame(game, player2, [2, 7, 12, 55, 88]);
  enterGame(game, player3, [1, 3, 5, 7, 9]);
  
  drawWinningNumbers(game);
  determineWinners(game);
  