import React, { Component } from 'react';

class Note extends Component {
  state = {};
  render() {
    let { notes } = this.props;
    const { selectedCategory, onDelete, categories } = this.props;

    notes = selectedCategory
      ? notes.filter(n => n.category === selectedCategory)
      : notes;

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
