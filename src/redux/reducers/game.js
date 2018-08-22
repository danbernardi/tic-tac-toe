import { fromJS } from 'immutable';

export const init = fromJS({
  players: [],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  currentPlayerIndex: 0
});

const symbols = ['X', 'O'];

const game = (state = init, action) => {
  switch (action.type) {
    case 'MOVE': {
      const playerIndex = state.get('currentPlayerIndex');
      return state.setIn(['board', action.row, action.column], symbols[playerIndex])
        .set('currentPlayerIndex', (playerIndex + 1) % 2);
    }
    case 'ADD_PLAYER': {
      return state.set('players', state.get('players').push(action.playerName));
    }

    case 'RESET_GAME': {
      return state.set('players', fromJS([]));
    }

    case 'REMATCH': {
      return state.set('board', init.get('board'));
    }

    default: {
      return state;
    }
  }
};

export default game;
