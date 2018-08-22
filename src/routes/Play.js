import React from 'react';
import { connect } from 'react-redux';
import { map } from 'react-immutable-proptypes';
import { func } from 'prop-types';

import { move, rematch } from 'redux/actions';
import CoreLayout from 'containers/CoreLayout';
import { fromJS } from '../../node_modules/immutable';
import './Play.css';

export class Play extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      gameWon: false
    };

    this.symbols = ['X', 'O'];
    this.rematch = this.rematch.bind(this);
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
      return 'row';

    // column win condition
    } else if (this.validateWinCondition(columns)) {
      return 'column';

    // diagonal win condition
    } else if (this.validateWinCondition(diagonals)) {
      return 'diagonal';

    // stalemate condition
    } else if (rows.every((row) => row.every(a => a !== null))) {
      return 'stalemate';
    }

    return false;
  }

  componentDidUpdate (prevProps) {
    const board = this.props.game.get('board');
    const prevBoard = prevProps.game.get('board');

    if (prevBoard !== board) {
      const winStatus = this.checkForEndGameCondition(prevProps.game.getIn(['players', prevProps.game.get('currentPlayerIndex')]));
      if (winStatus) {
        this.setState({ gameWon: winStatus });
      }
    }
  }

  submitMove(row, column) {
    const { dispatch, game } = this.props;
    const { gameWon } = this.state;
    if (row !== null && column !== null) {

      // prevent player from selecting a square that is already used
      if (game.getIn(['board', row, column])) {
        alert('That square has already been selected. Try again.')
      } else if (!gameWon) {
        dispatch(move(row, column));
      }

    } else {
      alert('You need to pick a row and column before you can move!');
    }
  }

  rematch () {
    const { dispatch } = this.props;

    dispatch(rematch());
    this.setState({ gameWon: false });
  }

  render () {
    const { game } = this.props;
    const { gameWon } = this.state;

    const players = game.get('players');
    const rows = game.get('board');

    return (
      <CoreLayout>
        <div style={ { width: '100%' } }>
          { gameWon
            ? <div className="board__heading">
              <h4 className="mb2">
                { gameWon === 'stalemate'
                  ? 'Whoops. Nobody won that one.'
                  : <span>
                      <strong>{ players.get(game.get('currentPlayerIndex')) }</strong>&nbsp;
                      has won the game with a { gameWon } victory!
                    </span>
                }
              </h4>
              <button className="btn mb5" onClick={ this.rematch }>Rematch!</button>
            </div>

            : <div className="board__heading">
              <h2 className="mb2">{ players.get(0) } vs. { players.get(1) }</h2>
              <p>{ `${players.get(game.get('currentPlayerIndex'))}'s turn` }</p>
            </div>
          }

          <div className="board">
            { rows.flatten().map((row, index) => (
              <div
                key={ index }
                className={ row ? 'played' : '' }
                onClick={ () => this.submitMove(Math.floor(index / rows.size), index % rows.size) }
              ><span>{ row }</span></div>
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
