import React from "react";
import PropTypes from 'prop-types';

const Missed = ({missed}) => (
  <div className="missed">
    <h4 className="missed__title">you missed :</h4>
    <ul className="missed__items">
    {
      missed && missed.map((letter, index) => (
        <li className="missed__item" key={letter + index}>{letter}</li>
      ))
    }
    </ul>
  </div>
);

export default Missed;

Missed.propTypes = {
  missed: PropTypes.array
}
