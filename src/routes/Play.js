import React from 'react';
import { connect } from 'react-redux';
import { map } from 'react-immutable-proptypes';
import { func } from 'prop-types';

import { move } from 'redux/actions';
import CoreLayout from 'containers/CoreLayout';
import { fromJS } from '../../node_modules/immutable';
import './Play.css';

export class Play extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      row: 0,
      column: 0
    };

    this.symbols = ['X', 'O'];
  }

  validateWinCondition (arr) {
    return arr.findIndex((row) => row.every(a => a !== null && a === row.get(0))) !== -1
  }

  checkForEndGameCondition (winningPlayer) {
    const { game } = this.props;
    const rows = game.get('board');

    const columns = rows.map((row, index, arr) => {
      return fromJS([arr.getIn([0, index]), arr.getIn([1, index]), arr.getIn([2, index])]);
    });

    const diagonals = fromJS([
      [rows.getIn([0, 0]), rows.getIn([1, 1]), rows.getIn([2, 2])],
      [rows.getIn([0, 2]), rows.getIn([1, 1]), rows.getIn([2, 0])]
    ]);

    // row win condition
    if (this.validateWinCondition(rows)) {
      console.log(`${winningPlayer} row victory!`);

    // column win condition
    } else if (this.validateWinCondition(columns)) {
      console.log(`${winningPlayer} column victory!`);

    // diagonal win condition
    } else if (this.validateWinCondition(diagonals)) {
      console.log(`${winningPlayer} diagonal victory!`);

    // stalemate condition
    } else if (rows.reduce((acc, row) => row.every(a => a !== null))) {
      console.log('statemate!');
    }

    return false;
  }

  componentDidUpdate (prevProps) {
    const board = this.props.game.get('board');
    const prevBoard = prevProps.game.get('board');

    if (prevBoard !== board) {
      this.checkForEndGameCondition(prevProps.game.getIn(['players', prevProps.game.get('currentPlayerIndex')]));
    }
  }

  submitMove(row, column) {
    const { dispatch, game } = this.props;
    if (row !== null && column !== null) {

      // prevent player from selecting a square that is already used
      if (game.getIn(['board', row, column])) {
        alert('That square has already been selected. Try again.')
      } else {
        this.setState({ row, column });
        dispatch(move(row, column));
      }

    } else {
      alert('You need to pick a row and column before you can move!');
    }
  }

  render () {
    const { game } = this.props;

    const players = game.get('players');
    const rows = game.get('board');
    const boardCellNumber = 3;

    return (
      <CoreLayout>
        <div>
          <h2>{ players.get(0) } vs. { players.get(1) }</h2>
          <p>{ `${players.get(game.get('currentPlayerIndex'))}'s turn` }</p>
          <div className="board">
            { rows.flatten().map((row, index) => (
              <div
                key={ index }
                onClick={ () => this.submitMove(Math.floor(index / rows.size), index % rows.size) }
              >{ row }</div>
            )) }
          </div>
        </div>
      </CoreLayout>
    );
  }
};

const mapStateToProps = state => ({
  game: state.game
});

Play.propTypes = {
  game: map.isRequired,
  dispatch: func.isRequired
};

export default connect(mapStateToProps)(Play);
