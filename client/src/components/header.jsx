import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { onShowForm } = this.props;
    return (
      <header className="header">
        <div className="logo">
          <img src="logo.png" height="68" width="68" alt="My notes app Logo" />
          <h1>My note app</h1>
        </div>

        <button onClick={onShowForm} className="btn btn-large btn-open">
          {this.formatButtonText()}
        </button>
      </header>
    );
  }

  formatButtonText() {
    const { showForm } = this.props;
    return showForm ? 'Close' : 'Add a new note';
  }
}

export default Header;
