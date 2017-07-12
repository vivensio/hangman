import React from "react";
import PropTypes from "prop-types";

const GameOver = ({ onNewGameClick, lettersHidden }) => {
  const gameOverTitle = lettersHidden.length > 0 ? "game over" : "you won!";

  return (
    <div className="game-over">
      <h3 className="game-over__title">
        {gameOverTitle}
      </h3>
      <button className="btn btn--new" onClick={onNewGameClick}>
        new word
      </button>
    </div>
  );
};

export default GameOver;

GameOver.propTypes = {
  onNewGameClick: PropTypes.func,
  lettersHidden: PropTypes.array
};
