import React, { Component } from 'react';

class Category extends Component {
  state = {};
  render() {
    const { categories } = this.props;
    return (
      <ul>
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>
        {categories.map(category => (
          <li key={category.name} className="category">
            <button
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
