import React, { Component } from "react";

class Textbox extends Component {
  
  componentIsMounted() {
    this.textArea.focus();
  }

  componentDidUpdate() {
    this.textArea.focus();
  }

  render() {
    return (
      <textarea
        className="typebox--full"
        value={this.props.lastLetter}
        onChange={this.props.handler}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        autoFocus
        ref={input => {
          this.textArea = input;
        }}
      />
    );
  }
}

export default Textbox;