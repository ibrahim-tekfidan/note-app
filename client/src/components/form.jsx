import React, { Component } from 'react';
import Joi from 'joi';

class Form extends Component {
  state = {
    form: {
      text: '',
      source: '',
      category: '',
    },
    errors: {},
  };

  schema = Joi.object({
    text: Joi.string().required().label('Text'),
    source: Joi.string().uri().required().label('Source'),
    category: Joi.string().required().label('Category'),
  });

  handleSubmit = event => {
    event.preventDefault();

    const { error } = this.schema.validate(this.state.form, {
      abortEarly: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach(detail => {
        errors[detail.context.key] = detail.message;
      });
      this.setState({ errors });
      return;
    }

    const newNote = {
      text: this.state.form.text,
      source: this.state.form.source,
      category: this.state.form.category,
    };

    this.props.addData(newNote);
    this.setState({ errors: {} });
  };

  handleInputChange = e => {
    const updatedForm = { ...this.state.form };
    updatedForm[e.target.name] = e.target.value;
    this.setState({
      form: updatedForm,
    });
  };

  render() {
    const { categories } = this.props;
    const { form, errors } = this.state;

    return (
      <>
      <form className="note-form" onSubmit={this.handleSubmit}>
        <div>
        <input
        className={errors.category ? 'note-form-warning' : ''}
        type="text"
        placeholder="Add a new note..."
        value={form.text}
        onChange={this.handleInputChange}
        name="text"
        />
        {errors.text && <span className='note-form-warning-text'>{errors.text}</span>}
        </div>
        <div>
        <input
        className={errors.category ? 'note-form-warning' : ''}
        type="text"
        placeholder="Source(http://)"
        value={form.source}
        onChange={this.handleInputChange}
        name="source"
        />
        {errors.source && <span>{errors.source}</span>}
        </div>
        <div>
        <select
          className={errors.category ? 'note-form-warning' : ''}
          value={form.category}
          onChange={this.handleInputChange}
          name="category"
          >
          <option value="">Choose category:</option>
          {categories.map(category => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && <span>{errors.category}</span>}
        </div>
        <button className="btn btn-large" type="submit">
          ADD
        </button>
      </form>
      </>
    );
  }
}

export default Form;
