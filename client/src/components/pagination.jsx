import React, { Component } from 'react';
import _ from 'lodash';

class Pagination extends Component {
  state = {};

  render() {
    const { notesCount, pageSize, onPageChange, currentPage } = this.props;

    const pagesCount = Math.ceil(notesCount.length / pageSize);
    const pages = _.range(1, pagesCount + 1);

    return (
      <ul className="pagination">
        {pages.map(page => (
          <li key={page}>
            <button
              className={this.formatButtonClass(page, currentPage)}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  formatButtonClass(page, currentPage) {
    let classes = 'btn-page';
    classes += page === currentPage ? ' btn-page-active' : '';
    return classes;
  }
}

export default Pagination;
