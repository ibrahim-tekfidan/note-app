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

    const categoriseNotes = this.categoriseNote();
    let notes = categoriseNotes;

    if (categoriseNotes.length >= pageSize)
      notes = this.paginateNote(categoriseNotes);

    return (
      <div className="container-note-pagination">
        <ul className="notes">
          {notes.map(note => (
            <li key={note.id} className="note">
              <p>
                {note.text}
                <a
                  className="source"
                  href={note.source ? note.source : undefined}
                  target="_blank"
                >
                  ({this.formatSource(note)})
                </a>
              </p>
              <span
                style={{
                  backgroundColor: this.formatCategoryStyle(note),
                }}
                className="tag"
              >
                {this.formatCategoryName(note)}
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
      </div>
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
    const startIndex = (currentPage - 1) * pageSize;
    return _(notes).slice(startIndex).take(pageSize).value();
  }

  formatCategoryStyle(note) {
    return note.category
      ? this.props.categories.find(category => category.name === note.category)
          .color
      : '';
  }

  formatCategoryName(note) {
    return note.category ? note.category : 'No Category';
  }

  formatSource(note) {
    return note.source ? 'Source' : 'No source';
  }
}

export default Note;
