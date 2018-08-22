import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { resetGame } from 'redux/actions';
import './Header.css';
import { rematch } from '../../redux/actions';

const Header = (props) => {
  const { dispatch } = props;

  function newGame () {
    dispatch(resetGame());
    dispatch(rematch());
  }

  return (
    <header className="header">
      <Link to="/" onClick={ newGame }><img src={ require('assets/logo.svg') } alt="Tic Tac Toe" /></Link>

      <Link to="/" className="btn" onClick={ newGame }>New game</Link>
    </header>
  )
}

Header.propTypes = {
  dispatch: func.isRequired
};

export default connect()(Header);
