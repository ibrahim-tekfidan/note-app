import React, { Component } from 'react';

class Category extends Component {
  state = {};
  render() {
    const { categories, onCategory } = this.props;
    return (
      <ul>
        <li className="category">
          <button
            onClick={() => onCategory('')}
            className="btn btn-all-categories"
          >
            All
          </button>
        </li>
        {categories.map(category => (
          <li key={category.name} className="category">
            <button
              onClick={() => onCategory(category.name)}
              className="btn btn-category"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default Category;
