import React, { Component } from 'react';
import _ from 'lodash';
import Pagination from './pagination';

class Note extends Component {
  state = {
    currentPage: 1,
    pageSize: 5,
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { pageSize, currentPage } = this.state;
    const { onDelete, categories } = this.props;

    // Kategorilere ayırmak için
    let categoriseNotes = this.categoriseNote();
    let notes = categoriseNotes;

    // Sayfalama yapmak için
    if (categoriseNotes.length >= pageSize)
      notes = this.paginateNote(categoriseNotes);

    return (
      <>
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
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          notesCount={categoriseNotes}
        />
      </>
    );
  }

  categoriseNote() {
    const { notes, selectedCategory } = this.props;

    return selectedCategory
      ? notes.filter(n => n.category === selectedCategory)
      : notes;
  }

  paginateNote(notes) {
    const { currentPage, pageSize } = this.state;
    const staterIndex = (currentPage - 1) * pageSize;
    return _(notes).slice(staterIndex).take(pageSize).value();
  }
}

export default Note;
