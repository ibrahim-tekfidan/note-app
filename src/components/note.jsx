import React, { Component } from 'react';

class Note extends Component {
  state = {};
  render() {
    const { notes, categories, onDelete } = this.props;
    return (
      <ul>
        {notes.map(note => (
          <li key={note.id} className="note">
            <p>
              {note.text}
              <a className="source" href={note.source} target="_blank">
                (Source)
              </a>
            </p>
            <span
              style={{
                backgroundColor: categories.find(
                  category => category.name === note.category
                ).color,
              }}
              className="tag"
            >
              {note.category}
            </span>
            <div className="complete-button">
              <button onClick={() => onDelete(note)}>Tamamla ✅</button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default Note;
