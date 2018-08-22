export const move = (row, column) => ({
  type: 'MOVE', row, column
});

export const addPlayer = playerName => ({
  type: 'ADD_PLAYER', playerName,
});

export const resetGame = () => ({
  type: 'RESET_GAME'
});

export const rematch = () => ({
  type: 'REMATCH'
});
