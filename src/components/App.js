import React, { Component } from "react";
import fetch from 'isomorphic-fetch';
import { MAX_ATTEMPTS, API_URL } from "../constants";
import GameOver from "./GameOver";
import Textbox from "./Textbox";
import Loading from "./Loading";
import Hangman from "./Hangman";
import Missed from "./Missed";
import Corner from "./Corner";
import Slots from "./Slots";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    this.startGame = this.startGame.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTextboxChange = this.handleTextboxChange.bind(this);
  }

  getInitialState() {
    return {
      key: "",
      word: "",
      textInput: "",
      isGameOver: false
    };
  }

  componentWillMount() {
    this.fetchNewWord();
    window.addEventListener("keypress", this.handleKeyPress);
  }

  fetchNewWord() {
    return fetch(API_URL)
      .then(response => response.json())
      .then(json => this.setState({ word: json.word.toLowerCase() }));
  }

  handleKeyPress(event) {
    const { isGameOver } = this.state;

    if (isGameOver && event.keyCode === 13) {
      this.startGame();
    }
  }

  handleTextboxChange(event) {
    event.stopPropagation();
    const { textInput, isGameOver } = this.state;

    if (isGameOver) {
      return;
    }

    const key = event.target.value.trim().toLowerCase().substr(-1);
    this.setState({ key, textInput: textInput.concat(key) });
  }

  componentDidUpdate() {
    const { word, textInput, isGameOver } = this.state;

    // If a character in `textInput` exists in `word`, 
    // we need to count that character as a hit only ONCE.
    
    const lettersHitCount = textInput.split("").reduce((sum, value, i, arr) => {
      let includes = word.includes(value);
      let inc = 0;

      if (includes) {
        let first = arr.indexOf(value);
        let last = arr.lastIndexOf(value);
        inc = first === last || (first < last && i === first) ? 1 : 0;
      }

      return sum + inc;
    }, 0);

    const isGameOverNEW =
      this.lettersMissed.length >= MAX_ATTEMPTS ||
      lettersHitCount === uniques(word).length;

    if (isGameOver !== isGameOverNEW) {
      this.setState({ isGameOver: isGameOverNEW });
    }
  }

  startGame() {
    this.setState(this.getInitialState());
    this.fetchNewWord();
  }

  render() {
    const { word, key, textInput, isGameOver } = this.state;

    if (!isGameOver) {
      this.lettersHidden = word.split("").filter(letter => {
        return letter !== key && !textInput.includes(letter);
      });

      this.lettersMissed = textInput.split("").filter((letter, i, letters) => {
        return i === letters.indexOf(letter) && !word.includes(letter);
      });
    }

    return (
      <div className="container">
        <div className="board">
          {!word
            ? <Loading />
            : <div>
                <Textbox lastLetter={key} handler={this.handleTextboxChange} />
                <Hangman missedCount={this.lettersMissed.length} />
                <Missed missed={this.lettersMissed} />
                <Slots lettersHidden={this.lettersHidden} word={word} />
                {isGameOver &&
                  <GameOver
                    onNewGameClick={this.startGame}
                    lettersHidden={this.lettersHidden}
                  />}
                <Corner />
              </div>}
        </div>
      </div>
    );
  }
}

export default App;

function uniques(arr) {
  return arr.split("").filter((letter, i, letters) => {
    return i === letters.indexOf(letter);
  });
}
