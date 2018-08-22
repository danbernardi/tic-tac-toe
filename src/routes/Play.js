import React from 'react';
import { connect } from 'react-redux';
import { map } from 'react-immutable-proptypes';
import { func } from 'prop-types';

import { move } from 'redux/actions';
import CoreLayout from 'containers/CoreLayout';
import { fromJS } from '../../node_modules/immutable';

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
      console.log(`column victory!`);

    // diagonal win condition
    } else if (this.validateWinCondition(diagonals)) {
      console.log(`diagonal victory!`);

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

  submitMove() {
    const { dispatch, game } = this.props;
    const { row, column } = this.state;
    const board = game.get('board');

    if (row !== null && column !== null) {

      // prevent player from selecting a square that is already used
      if (game.getIn(['board', row, column])) {
        alert('That square has already been selected. Try again.')
      } else {
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
    const cellIndices = [...Array(boardCellNumber).keys()];

    const drawRow = (row) => {
      const center = cellIndices.map(ind => row.get(ind) || ' ')
        .join(' | ');
      return `| ${ center } |`;
    };

    const verticalBorder = cellIndices.reduce((string) => string.concat('----'), '-')
    const rowHTML = [verticalBorder, ...rows.map(drawRow), verticalBorder]
      .map((row, ind) => <p key={ ind }>{ row }</p>);

    return (
      <CoreLayout>
        <div>
          <h2>{ players.get(0) } vs. { players.get(1) }</h2>
          <p>{ `${players.get(game.get('currentPlayerIndex'))}'s turn` }</p>
          <div>
            { rowHTML }
          </div>

          <div>
            Select a row:
            <select
              value={ this.state.row }
              onChange={ (event) => { this.setState({ row: Number(event.target.value) }) } }
            >
              {
                cellIndices.map(ind => (
                  <option value={ ind } key={ ind } >{ ind }</option>
                ))
              }
            </select>
          </div>

          <div>
            Select a column:
            <select
              value={ this.state.column }
              onChange={ (event) => { this.setState({ column: event.target.value }) } }
            >
              {
                cellIndices.map(ind => (
                  <option value={ ind } key={ ind } >{ ind }</option>
                ))
              }
            </select>
          </div>

          <input
            className="submit"
            type="submit"
            onClick={ () => { this.submitMove(); } }
          />
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
