import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Slot = ({ lettersHidden, letter }) => {
  const shouldDisplay = lettersHidden && !lettersHidden.includes(letter);
  const slotClasses = classNames("slot", {
    "slot--blank": !letter,
    "slot--filled": shouldDisplay
  });

  return (
    <li className={slotClasses}>
      {shouldDisplay ? letter : ""}
    </li>
  );
};

export default Slot;

Slot.propTypes = {
  lettersHidden: PropTypes.array,
  letter: PropTypes.string
};
