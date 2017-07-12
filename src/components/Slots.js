import React, { Component } from "react";
import PropTypes from "prop-types";
import { MAX_WORD_LENGTH } from "../constants";
import Slot from "./Slot";

class Slots extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.lettersHidden.length === nextProps.lettersHidden.length) {
      return false;
    }

    return true;
  }

  getBlankSlots() {
    const blankSlots = [];
    const blankSlotsCount = MAX_WORD_LENGTH - this.props.word.length;

    for (let i = 0; i < blankSlotsCount; i += 1) {
      blankSlots.push(<Slot letter="" key={i} />);
    }

    return blankSlots;
  }

  render() {
    const { lettersHidden, word } = this.props;
    const blankSlots = this.getBlankSlots();
    const filledSlots = word
      .split("")
      .map((letter, index) =>
        <Slot
          key={letter + index}
          letter={letter}
          lettersHidden={lettersHidden}
        />
      );

    return (
      <div className="slots-wrapper">
        {
          <ul className="slots">
            {blankSlots}
            {filledSlots}
          </ul>
        }
      </div>
    );
  }
}

export default Slots;

Slots.propTypes = {
  word: PropTypes.string,
  lettersHidden: PropTypes.array
};
