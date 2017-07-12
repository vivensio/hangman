import React, { Component } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

class Hangman extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.missedCount !== nextProps.missedCount;
  }

  render() {
    const { missedCount } = this.props;
    const hangman = {};
    const parts = [
      "head", "neck", "corpus",
      "left-arm", "right-arm",
      "left-hand", "right-hand",
      "right-leg", "left-leg",
      "right-foot", "left-foot"
    ];

    parts.forEach((part, index) => {
      hangman[part] = classNames(`hangman__${part}`, {
        "is-active": missedCount > index
      });
    });

    return (
      <div className="hangman">
        <div className="hangman__bar is-active" />
        <div className={hangman["head"]} />
        <div className={hangman["neck"]} />
        <div className={hangman["corpus"]} />
        <div className={hangman["left-arm"]} />
        <div className={hangman["left-hand"]} />
        <div className={hangman["right-arm"]} />
        <div className={hangman["right-hand"]} />
        <div className={hangman["left-leg"]} />
        <div className={hangman["left-foot"]} />
        <div className={hangman["right-leg"]} />
        <div className={hangman["right-foot"]} />
      </div>
    );
  }
}

export default Hangman;

Hangman.propTypes = {
  missedCount: PropTypes.number
}
